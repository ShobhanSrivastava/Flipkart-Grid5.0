// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Transactions.sol";

contract Token is Transactions{
    uint256 _totalSupply;
    uint256 expirationInMinutes = 5 minutes;

    struct CustomerBalances {
        uint256 startId;
        uint256 endId;
        uint256[] tokenBalance;
        uint256[] transactionTime;
    }

    mapping(address => uint256) balances;
    mapping(address => CustomerBalances) decayableBalances; 

    event Transfer(address sender, address recipient, uint256 tokens, string transactionType);
    error InsufficientBalance(uint256 required, uint256 available);

    function setExpirationInMinutes(uint256 numberOfMinutes) internal returns (bool) {
        expirationInMinutes = numberOfMinutes * 1 minutes;
        return true;
    }

    function _mint(uint256 tokens) public virtual returns (bool) {}

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address who) public view returns (uint256) {
        return balances[who];
    }

    function transferFrom(
        address sender, 
        address recipient, 
        string memory senderName,
        string memory recipientName,
        uint256 tokens, 
        string memory transactionType,
        uint256 senderRole,
        uint256 recipientRole
    ) internal returns (bool) {
        if(balances[sender] < tokens) revert InsufficientBalance(tokens, balances[sender]);

        balances[sender] -= tokens;
        balances[recipient] += tokens;

        registerTransaction(sender, recipient, senderName, recipientName, tokens, 0, transactionType);

        if(senderRole == 0) {
            CustomerBalances storage senderBalances = decayableBalances[sender];

            while(tokens > 0) {
                if(senderBalances.tokenBalance[senderBalances.startId] >= tokens) {
                    senderBalances.tokenBalance[senderBalances.startId] -= tokens;
                    tokens = 0;

                    if(senderBalances.tokenBalance[senderBalances.startId] == 0) {
                        senderBalances.startId++;
                    }
                } else {
                    tokens -= senderBalances.tokenBalance[senderBalances.startId];
                    senderBalances.tokenBalance[senderBalances.startId] = 0;
                    senderBalances.startId++;
                }
            }

            senderBalances.endId++;
        }

        if(recipientRole == 0) {
            CustomerBalances storage recipientBalances = decayableBalances[recipient];
            recipientBalances.tokenBalance.push(tokens);
            recipientBalances.transactionTime.push(block.timestamp);

            recipientBalances.endId++;
        }

        return true;
    }

    function decayTokens(address user, address owner, string memory userName, string memory ownerName) internal {
        CustomerBalances storage userBalances = decayableBalances[user];

        uint256 numberOfExpiredTokens = 0;

        if(userBalances.startId != userBalances.endId) {
            while(userBalances.startId != userBalances.endId && userBalances.transactionTime[userBalances.startId] + expirationInMinutes <= block.timestamp && userBalances.startId != userBalances.endId) {
                numberOfExpiredTokens += userBalances.tokenBalance[userBalances.startId];
                userBalances.startId++;
            }

            if(numberOfExpiredTokens > 0) {
                balances[user] -= numberOfExpiredTokens;
                balances[owner] += numberOfExpiredTokens;

                registerTransaction(user, owner, userName, ownerName, numberOfExpiredTokens, 0, "Token Expiration");
            }
        }
    }
}