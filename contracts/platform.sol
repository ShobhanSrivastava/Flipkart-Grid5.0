// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./structs/Offer.sol";
import "./structs/Transaction.sol";
import "./structs/User.sol";

contract Platform {
    address platformOwner;
    string platformOwnerName = "Flipkart";

    // Variables to keep track of tokens
    uint256 _totalSupply;
    mapping(address => uint256) balances;

    // events
    event Transfer(address sender, address receiver, uint256 tokenAmount);

    // modifiers
    modifier onlyOwner() {
        require(msg.sender == platformOwner, "Only platform owner is allowed to do this transaction");
        _;
    }

    // Variables to keep track of users on the platform
    address[] userAddresses;
    mapping(address => User) users;

    uint256 transactionCount = 0;
    mapping(address => uint256) numberOfTransactions;
    mapping(address => Transaction[]) transactions;

    // Rewards mapping
    uint256 offerCount = 1;
    mapping(uint256 => Offer) offers;

    // Called when contract is deployed
    constructor() {
        platformOwner = msg.sender;
    }

    function registerTransaction(
        address firstPartyAddress, 
        uint256 tokenAmount,
        address secondPartyAddress,
        uint256 offerID, // To store the id of reward or deal if there was an exchange of products
        string memory transactionTypeForParty1, // Types => Reward, Purchase etc
        string memory transactionTypeForParty2
    ) internal {
        // Register the transaction for first Party

        string memory firstPartyName = users[firstPartyAddress].name;
        string memory secondPartyName = users[secondPartyAddress].name;

        Transaction memory transaction1 = Transaction(transactionCount, "DEBIT", tokenAmount, secondPartyAddress, secondPartyName, offerID, transactionTypeForParty1);

        Transaction[] storage userTransactions1 = transactions[firstPartyAddress];
        userTransactions1.push(transaction1);

        // Register the transaction for second Party
        Transaction memory transaction2 = Transaction(transactionCount, "CREDIT", tokenAmount, firstPartyAddress, firstPartyName, offerID, transactionTypeForParty2);

        Transaction[] storage userTransactions2 = transactions[secondPartyAddress];
        userTransactions2.push(transaction2);

        // Increase the count of transactions for both parties by 1
        numberOfTransactions[firstPartyAddress]++;
        numberOfTransactions[secondPartyAddress]++;

        transactionCount++;
    }

    // Function to get user transactions
    function getUserTransactions(address user) public view returns(Transaction[] memory){
        Transaction[] memory userTransactions = new Transaction[](numberOfTransactions[user]);
        for(uint256 i=0 ; i<numberOfTransactions[user] ; i++) {
            Transaction storage currentTransaction = transactions[user][i];
            userTransactions[i] = currentTransaction;
        }

        return userTransactions;
    }

    // Function to mint tokens
    function _mint(uint256 value) public onlyOwner {
        balances[msg.sender] += value;
        _totalSupply += value;

        registerTransaction(address(0), value, msg.sender, 0, "Minting", "Minting");
    }

    // Function to transfer from caller's account to reciever's account
    function transfer(address receiver, uint256 tokenAmount) public returns (bool) {
        require(msg.sender != receiver, "You cannot send money to yourself");
        require(balances[msg.sender] > tokenAmount, "Insufficient Balance");

        balances[msg.sender] -= tokenAmount;
        balances[receiver] += tokenAmount;

        return true;
    }

    // Get the user's balance
    function balanceOf() public view returns (uint256) {
        return balances[msg.sender];
    }

    // Function to get the totalSupply
    function totalSupply() public view returns  (uint256) {
        return _totalSupply;
    }

    // Function to transfer coins from one party to another. 
    // Only allowed to the ecommerce platform
    function transferFrom(address firstParty, address secondParty, uint256 tokenAmount) public onlyOwner returns (bool) {
        require(balances[firstParty] >= tokenAmount, "Insufficient funds");

        balances[firstParty] -= tokenAmount;
        balances[secondParty] += tokenAmount;

        return true;
    }

    // Create user
    function createUser(
        string memory name,
        string memory email,
        uint256 phoneNumber
    ) public returns (bool) {
        // address[] userAddresses;
        // mapping(address => User) users;

        require(users[msg.sender].registered != true, "User is already registered");

        userAddresses.push(msg.sender);
        User storage newUser = users[msg.sender];
        newUser.name = name;
        newUser.email = email;
        newUser.phoneNumber = phoneNumber;
        newUser.role = "customer";
        newUser.registered = true;

        return true;
    }

    function isRegistered(address who) public view returns (bool) {
        return users[who].registered;
    }

    // Function to get user's data
    function getUserData(address who) public view returns (User memory) {
        require(users[who].registered == true, "No such user exists");

        return users[who];
    }

    // Create offer function
    function createOffer(
        string memory name,
        string memory description,
        uint256 value,
        uint256 quantity,
        string memory productURL,
        string memory businessName,
        uint256 startTime,
        uint256 endTime,
        bool exclusiveDeal
    ) public returns (bool) {
        require(value > 0, "Value cannot be less than 0");
        require(startTime > block.timestamp, "Start time needs to be in the future");
        require(endTime > block.timestamp, "End time needs to be greater than start time");

        uint256 priceInTokens = (exclusiveDeal == true) ? value : (value / 5);

        Offer storage newOffer = offers[offerCount];

        newOffer.name = name;
        newOffer.description = description;
        newOffer.value = value;
        newOffer.quantity = quantity;
        newOffer.priceInTokens = priceInTokens;
        newOffer.productURL = productURL;
        newOffer.businessName = businessName;
        newOffer.businessAddress = msg.sender;
        newOffer.startTime = startTime;
        newOffer.endTime = endTime;
        newOffer.exclusiveDeal = exclusiveDeal;

        offerCount++;

        return true;
    }

    // Get all offers
    function getAllOffers() public view returns (Offer[] memory) {
        Offer[] memory allOffers = new Offer[](offerCount);

        for(uint256 i=0 ; i<offerCount ; i++) {
            Offer storage offer = offers[i];
            allOffers[i] = offer;
        }

        return allOffers;
    }

    // Function to buy offer
    function buyOffer(uint256 _id) public returns (bool) {
        Offer storage currentOffer = offers[_id];

        require(balances[msg.sender] >= currentOffer.priceInTokens, "Insufficient Funds");
        require((currentOffer.startTime/1000) <= block.timestamp && currentOffer.endTime <= block.timestamp, "Rewards/Deals can be claimed only within the time set by the partners");
        require(currentOffer.quantity > 0, "Offer Sold out");

        address receiver = (currentOffer.exclusiveDeal == true) ? currentOffer.businessAddress : platformOwner;

        balances[msg.sender] -= currentOffer.priceInTokens;
        balances[receiver] += currentOffer.priceInTokens;

        currentOffer.quantity--;
        currentOffer.buyers.push(msg.sender);

        string memory transactionTypeForParty1 = (currentOffer.exclusiveDeal == true) ? "Purchase" : "Reward Claim";
        string memory transactionTypeForParty2 = (currentOffer.exclusiveDeal == true) ? "Sale" : "Reward Claim";

        // Add to customer's purchases
        users[msg.sender].purchases.push(_id);

        // Register transaction
        registerTransaction(msg.sender, currentOffer.priceInTokens, receiver, _id, transactionTypeForParty1, transactionTypeForParty2);

        return true;
    }

    // Function to reward customers
    function rewardCustomer(address customer, uint256 tokenAmount) public {
        balances[platformOwner] -= tokenAmount;
        balances[customer] += tokenAmount;

        registerTransaction(msg.sender, tokenAmount, platformOwner, 0, "Buy Tokens", "Sell Tokens");
        registerTransaction(msg.sender, tokenAmount, customer, 0, "Reward Loyal Customer", "Rewarded for being Loyal");
    }
}