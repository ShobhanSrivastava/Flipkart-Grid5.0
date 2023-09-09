// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "./DependencyContracts/Token.sol";
import "./DependencyContracts/Users.sol";
import "./DependencyContracts/Offers.sol";

contract Platform is ERC2771Recipient, Token, Users, Offers {
    address owner;

    modifier onlyOwner() {
        require(_msgSender() == owner, "Only Platform Owner is allowed to do this action");
        _;
    }

    function createUser(string memory name, string memory profileURL) public returns (bool) {
        _createUser(_msgSender(), name, profileURL, 1);
        return true;
    }

    constructor(
        string memory name, string memory profileURL, address _forwarder
    ) {
        owner = _msgSender();
        _createUser(_msgSender(), name, profileURL, 0);
        _setTrustedForwarder(_forwarder);
    }

    function setTrustedForwarder_(address _forwarder) public onlyOwner {
        _setTrustedForwarder(_forwarder);
    }

    function _mint(uint256 tokens) public override onlyOwner returns (bool) {
        balances[_msgSender()] += tokens;
        _totalSupply += tokens;

        registerTransaction(address(0), _msgSender(), "Zero Address", userMappings[owner].name, tokens, 0, "Minting");

        emit Transfer(address(0), owner, tokens, "Minting");
        return true;
    }

    error PlatformError(string message);

    function updateRoleToPartner(address user) public override onlyOwner returns (bool) {
        if(user == owner) revert PlatformError("Cannot change the owner's role");
        if(userMappings[user].registered != true) revert PlatformError("Not a registered user");

        userMappings[user].role = 2;
        return true;
    }

    // Reward Customer for purchase
    function rewardForPurchase(address customer, uint256 purchaseAmount) public onlyOwner returns (bool) {
        if(userMappings[customer].registered != true) revert PlatformError("Not a registered Customer");
        uint256 tokenAmount;

        // Based on whether the customer is plus customer or not, transfer amount to customer
        if(userMappings[customer].plusCustomer == true) {
            tokenAmount = (purchaseAmount / 100) * 4;
            tokenAmount = (tokenAmount > 100) ? 100 : tokenAmount;
        } else {
            tokenAmount = (purchaseAmount / 100) * 2;
            tokenAmount = (tokenAmount > 50) ? 50 : tokenAmount;
        }

        transferFrom(owner, customer, userMappings[owner].name, userMappings[customer].name, tokenAmount, "Reward For Purchase", 0, userMappings[customer].role);
        userMappings[customer].purchaseAmount += purchaseAmount;

        // Plus customer criteria => More than 50 thousand rupees spent on Flipkart
        if(userMappings[customer].purchaseAmount >= 50000) {
            userMappings[customer].plusCustomer = true;
        }

        return true;
    }

    // Function to reward customers for actions
    function platformRewards(address customer, uint256 tokenAmount, uint256 transactionTypeNum) public onlyOwner returns (bool) {
        if(userMappings[customer].registered != true) revert PlatformError("Not a registered Customer");

        string memory transactionType;

        if(transactionTypeNum == 1) { // Customer being paid for referrals
            transactionType = "Referral Rewards";
        } else if(transactionTypeNum == 2) { // Customer being paid for social media interactions
            transactionType = "Social Media Interactions";
        } else if(transactionTypeNum == 3) { // Customer being paid for playing games
            transactionType = "Playing Games";
        } else {
            transactionType = "Miscellaneous"; 
        }

        transferFrom(owner, customer, userMappings[owner].name, userMappings[customer].name, tokenAmount, transactionType, 0, userMappings[customer].role);
        return true;
    }

    // Function to reward customers
    function rewardCustomer(address customer, uint256 tokenAmount) public {
        require(_msgSender() != owner, "Only Partners can reward loyal customers"); // Add for the partners

        transferFrom(owner, _msgSender(), userMappings[owner].name, userMappings[_msgSender()].name, tokenAmount, "Buy Tokens", 0, userMappings[_msgSender()].role);
        transferFrom(_msgSender(), customer, userMappings[_msgSender()].name, userMappings[customer].name, tokenAmount, "Reward Tokens", userMappings[_msgSender()].role, userMappings[customer].role);
    }

    function createOffer(string memory name, string memory description, uint256 value, uint256 price, uint256 quantity, string memory productURL, uint256 startTime, uint256 endTime, bool exclusiveDeal) public returns (bool) {
        uint256 offerId = _createOffer(name, description, value, price, quantity, productURL, userMappings[_msgSender()].name, _msgSender(), startTime, endTime, exclusiveDeal);
        userMappings[_msgSender()].createdOffers.push(offerId);
        return true;
    }

    // Function to buy offer
    function buyOffer(uint256 _id) public returns (bool) {
        Offer storage currentOffer = offers[_id];

        require(balances[_msgSender()] >= currentOffer.priceInTokens, "Insufficient Funds");
        require(currentOffer.startTime <= block.timestamp && currentOffer.endTime >= block.timestamp, "Rewards/Deals can be claimed only within the offer period");
        require(currentOffer.quantity > 0, "Offer Sold out");

        address receiver = (currentOffer.exclusiveDeal == true) ? currentOffer.businessAddress : owner;
        string memory transactionType = (currentOffer.exclusiveDeal == true) ? "Purchase" : "Reward Claim";

        transferFrom(_msgSender(), receiver, userMappings[_msgSender()].name, userMappings[receiver].name, currentOffer.priceInTokens, transactionType, userMappings[_msgSender()].role, userMappings[receiver].role);

        currentOffer.quantity--;

        // Add to customer's purchases
        userMappings[_msgSender()].purchasedOffers.push(_id);

        return true;
    }

    function setExpiry(uint256 numberOfMinutes) public onlyOwner returns (bool) {
        setExpirationInMinutes(numberOfMinutes);
        return true;
    }

    function decay() public onlyOwner returns (bool) {
        for(uint256 i=0 ; i<userCount ; i++) {
            if(userMappings[userAddresses[i]].role == 1) {
                decayTokens(userAddresses[i], owner, userMappings[userAddresses[i]].name, userMappings[owner].name);
            }
        }

        return true;
    }
}