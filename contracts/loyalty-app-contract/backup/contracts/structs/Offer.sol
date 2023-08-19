// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Offer {
    string name;
    string description;
    uint256 priceInTokens;
    uint256 value;
    uint256 quantity;
    string productURL;
    string businessName;
    address businessAddress;
    uint256 startTime;
    uint256 endTime;
    bool exclusiveDeal;
    address[] buyers;
}