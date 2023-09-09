// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transactions {
    struct Transaction {
        uint256 transactionId;
        string transactionNature; // CREDIT OR DEBIT
        uint256 tokenAmount;
        address otherPartyAddress;
        string otherPartyName;
        uint256 offerID; // To store the id of reward or deal if there was an exchange of products
        string transactionType; // Types => Reward, Purchase etc
    }

    uint256 transactionCount = 0;
    mapping(address => uint256) transactionCountOfAddress;
    mapping(address => Transaction[]) transactions;

    function registerTransaction(
        address userAddress1,
        address userAddress2,
        string memory username1,
        string memory username2,
        uint256 tokens, 
        uint256 offerID,
        string memory transactionType
    ) internal returns (bool) {

        Transaction memory transaction1 = Transaction(transactionCount, "DEBIT", tokens, userAddress2, username2, offerID, transactionType);
        transactions[userAddress1].push(transaction1);
        transactionCountOfAddress[userAddress1]++;

        Transaction memory transaction2 = Transaction(transactionCount, "CREDIT", tokens, userAddress1, username1, offerID, transactionType);
        transactions[userAddress2].push(transaction2);
        transactionCountOfAddress[userAddress2]++;

        transactionCount++;

        return true;
    }

    function getUserTransactions(address user) public view returns(Transaction[] memory){
        Transaction[] memory userTransactions = new Transaction[](transactionCountOfAddress[user]);
        for(uint256 i=0 ; i<transactionCountOfAddress[user] ; i++) {
            Transaction storage currentTransaction = transactions[user][i];
            userTransactions[i] = currentTransaction;
        }

        return userTransactions;
    }
}