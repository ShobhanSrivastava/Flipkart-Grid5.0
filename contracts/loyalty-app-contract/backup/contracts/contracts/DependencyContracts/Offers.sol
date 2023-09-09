// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Offers {
    struct Offer {
        uint256 id;
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

    uint256 offerCount = 1;
    mapping(uint256 => Offer) offers;

    // Create offer function
    function _createOffer(
        string memory name,
        string memory description,
        uint256 value,
        uint256 price,
        uint256 quantity,
        string memory productURL,
        string memory businessName,
        address businessAddress,
        uint256 startTime,
        uint256 endTime,
        bool exclusiveDeal
    ) internal returns (uint256) {
        require(value > 0, "Value cannot be less than 0");
        require(startTime > block.timestamp, "Start time needs to be in the future");
        require(endTime > startTime, "End time needs to be greater than start time");

        Offer storage newOffer = offers[offerCount];

        newOffer.id = offerCount;
        newOffer.name = name;
        newOffer.description = description;
        newOffer.value = value;
        newOffer.quantity = quantity;
        newOffer.priceInTokens = price;
        newOffer.productURL = productURL;
        newOffer.businessName = businessName;
        newOffer.businessAddress = businessAddress;
        newOffer.startTime = startTime;
        newOffer.endTime = endTime;
        newOffer.exclusiveDeal = exclusiveDeal;

        offerCount++;

        return newOffer.id;
    }

    function getAllOffers() public view returns (Offer[] memory) {
        Offer[] memory allOffers = new Offer[](offerCount);

        for(uint256 i=1 ; i<offerCount ; i++) {
            Offer storage offer = offers[i];
            allOffers[i] = offer;
        }

        return allOffers;
    }

    // Get a particular offer
    function getOffer(uint256 _id) public view returns (Offer memory) {
        return offers[_id];
    }
}