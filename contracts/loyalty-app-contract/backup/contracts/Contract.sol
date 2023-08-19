// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

import "./structs/Offer.sol";
import "./structs/Transaction.sol";
import "./structs/User.sol";

contract Platform is ERC2771Context {
    address platformOwner;
    string platformOwnerName = "Flipkart";

    // Variables to keep track of tokens
    uint256 _totalSupply;
    mapping(address => uint256) balances;

    // events
    event Transfer(address sender, address receiver, uint256 tokenAmount);

    modifier onlyPlatformOwner() {
        require(_msgSender() == platformOwner, "Only Platform owner is allowed to do this transaction");
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
    constructor(MinimalForwarder forwarder) ERC2771Context(address(forwarder)) {
        platformOwner = msg.sender;
        User storage newUser = users[msg.sender];
        newUser.name = "Flipkart";
        newUser.role = "admin";
        newUser.registered = true;
        users[msg.sender] = newUser;
    }

    function _msgSender() internal view override(Context, ERC2771Context)
        returns (address sender) {
        sender = ERC2771Context._msgSender();
    }

    function _msgData() internal view override(Context, ERC2771Context) returns (bytes memory) {
        return ERC2771Context._msgData();
    } 

    // Function to register the transaction
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

        if(firstPartyAddress == address(0)) {
            firstPartyName = "Zero Account";
        }

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
    function _mint(uint256 value) public onlyPlatformOwner {
        balances[_msgSender()] += value;
        _totalSupply += value;

        registerTransaction(address(0), value, _msgSender(), 0, "Minting", "Minting");
    }

    // Get the user's balance
    function balanceOf(address user) public view returns (uint256) {
        return balances[user];
    }

    // Function to get the totalSupply
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // Function to transfer coins from one party to another. 
    // Only allowed to the ecommerce platform
    function transferFrom(address firstParty, address secondParty, uint256 tokenAmount) internal returns (bool) {
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

        require(users[_msgSender()].registered != true, "User is already registered");

        userAddresses.push(_msgSender());
        User storage newUser = users[_msgSender()];
        newUser.name = name;
        newUser.email = email;
        newUser.phoneNumber = phoneNumber;
        newUser.role = "customer";
        newUser.registered = true;

        return true;
    }

    // Check if the user is registered
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
        require(endTime > startTime, "End time needs to be greater than start time");

        uint256 priceInTokens = (exclusiveDeal == true) ? value : (value / 5);

        Offer storage newOffer = offers[offerCount];

        newOffer.name = name;
        newOffer.description = description;
        newOffer.value = value;
        newOffer.quantity = quantity;
        newOffer.priceInTokens = priceInTokens;
        newOffer.productURL = productURL;
        newOffer.businessName = businessName;
        newOffer.businessAddress = _msgSender();
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

    // Get a particular offer
    function getOffer(uint256 _id) public view returns (Offer memory) {
        return offers[_id];
    }

    // Function to buy offer
    function buyOffer(uint256 _id) public returns (bool) {
        Offer storage currentOffer = offers[_id];

        require(balances[_msgSender()] >= currentOffer.priceInTokens, "Insufficient Funds");
        require(currentOffer.startTime <= block.timestamp && currentOffer.endTime >= block.timestamp, "Rewards/Deals can be claimed only within the time set by the partners");
        require(currentOffer.quantity > 0, "Offer Sold out");

        address receiver = (currentOffer.exclusiveDeal == true) ? currentOffer.businessAddress : platformOwner;

        balances[_msgSender()] -= currentOffer.priceInTokens;
        balances[receiver] += currentOffer.priceInTokens;

        currentOffer.quantity--;
        currentOffer.buyers.push(_msgSender());

        string memory transactionTypeForParty1 = (currentOffer.exclusiveDeal == true) ? "Purchase" : "Reward Claim";
        string memory transactionTypeForParty2 = (currentOffer.exclusiveDeal == true) ? "Sale" : "Reward Claim";

        // Add to customer's purchases
        users[_msgSender()].purchases.push(_id);

        // Register transaction
        registerTransaction(_msgSender(), currentOffer.priceInTokens, receiver, _id, transactionTypeForParty1, transactionTypeForParty2);

        return true;
    }

    // Function to reward customers
    function rewardCustomer(address customer, uint256 tokenAmount) public {
        require(_msgSender() == platformOwner, "Only Partners can reward loyal customers"); // Add for the partners

        balances[platformOwner] -= tokenAmount;
        balances[customer] += tokenAmount;

        registerTransaction(_msgSender(), tokenAmount, platformOwner, 0, "Buy Tokens", "Sell Tokens");
        registerTransaction(_msgSender(), tokenAmount, customer, 0, "Reward Loyal Customer", "Rewarded for being Loyal");
    }

    // Reward Customer for purchase
    function rewardForPurchase(address customer, uint256 purchaseAmount) public onlyPlatformOwner returns (bool) {
        uint256 tokenAmount;

        // Based on whether the customer is plus customer or not, transfer amount to customer
        if(users[customer].plusCustomer == true) {
            tokenAmount = (purchaseAmount / 100) * 4;
            tokenAmount = (tokenAmount > 100) ? 100 : tokenAmount;
        } else {
            tokenAmount = (purchaseAmount / 100) * 2;
            tokenAmount = (tokenAmount > 50) ? 50 : tokenAmount;
        }

        users[customer].purchaseAmount += purchaseAmount;

        // Plus customer criteria => More than 50 thousand rupees spent on Flipkart
        if(purchaseAmount >= 50000) {
            users[customer].plusCustomer = true;
        }

        transferFrom(platformOwner, customer, tokenAmount);

        registerTransaction(platformOwner, tokenAmount, customer, 0, "Reward for purchase", "Reward for purchase");

        return true;
    }

    // Function to reward customers for actions
    function platformRewards(address customer, uint256 tokenAmount, uint256 transactionType) public onlyPlatformOwner returns (bool) {
        transferFrom(platformOwner, customer, tokenAmount);

        string memory transactionTypeForParty1;
        string memory transactionTypeForParty2;

        if(transactionType == 1) { // Customer being paid for referrals
            transactionTypeForParty1 = "Referral Rewards";
            transactionTypeForParty2 = "Referral Rewards";
        } else if(transactionType == 2) { // Customer being paid for social media interactions
            transactionTypeForParty1 = "Social Media Interactions";
            transactionTypeForParty2 = "Social Media Interactions";
        } else if(transactionType == 3) { // Customer being paid for playing games
            transactionTypeForParty1 = "Playing Games";
            transactionTypeForParty2 = "Playing Games";
        }

        registerTransaction(platformOwner, tokenAmount, customer, 0, transactionTypeForParty1, transactionTypeForParty2);

        return true;
    }
}