// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Transaction {
    uint256 transactionId;
    string transactionNature; // CREDIT OR DEBIT
    uint256 tokenAmount;
    address otherPartyAddress;
    string otherPartyName;
    uint offerID; // To store the id of reward or deal if there was an exchange of products
    string transactionType; // Types => Reward, Purchase etc
}