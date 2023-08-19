// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Users {
    struct User {
        string name;
        address userAddress;
        string profileURL;
        bool registered;
        string role;
        bool plusCustomer;
        uint256 purchaseAmount;
        uint256[] purchasedOffers;
        uint256[] createdOffers;
    }

    uint256 userCount = 0;
    address[] userAddresses;
    mapping(address => User) userMappings;

    error Err(string message);

    function getUserCount() public view returns (uint256) {
        return userCount;
    }

    function _createUser(address user, string memory name, string memory profileURL, string memory role) internal returns (bool) {
        if(userMappings[user].registered == true) revert Err("User is already registered");

        userAddresses.push(user);
        User storage tempUser = userMappings[user];
        tempUser.name = name;
        tempUser.userAddress = user;
        tempUser.profileURL = profileURL;
        tempUser.registered = true;
        tempUser.role = role;
        tempUser.plusCustomer = false;

        userCount++;

        return true;
    }

    function isRegistered(address user) public view returns (bool) {
        return userMappings[user].registered;
    }   

    function getUser(address user) public view returns (User memory)  {
        if(userMappings[user].registered != true) revert Err("User is not registered");

        return userMappings[user];
    }

    function updateRoleToPartner(address user) public virtual returns (bool) {}
    function demoteRoleToCustomer(address user) public virtual returns (bool) {}
}