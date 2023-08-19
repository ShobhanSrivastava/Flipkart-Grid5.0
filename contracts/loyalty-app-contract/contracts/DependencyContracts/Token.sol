// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Transactions.sol";

contract Token is Transactions{
    uint256 _totalSupply;
    uint256 _tokenExpirationTime;

    mapping(address => uint256) balances;

    event Transfer(address sender, address recipient, uint256 tokens, string transactionType);
    error InsufficientBalance(uint256 required, uint256 available);

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
        string memory transactionType
    ) public returns (bool) {
        if(balances[sender] < tokens) revert InsufficientBalance(tokens, balances[sender]);

        balances[sender] -= tokens;
        balances[recipient] += tokens;

        registerTransaction(sender, recipient, senderName, recipientName, tokens, 0, transactionType);

        return true;
    }
}