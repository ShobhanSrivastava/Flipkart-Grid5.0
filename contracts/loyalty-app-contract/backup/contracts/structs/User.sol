// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct User {
    string name;
    string email;
    uint256 phoneNumber;
    bool registered;
    string role;
    uint256[] purchases;
    uint256 purchaseAmount;
    bool plusCustomer;
}