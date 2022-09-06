// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16 <0.9.0;

import '../Util/baseStorage.sol';

contract UserStorage is BaseStorage {
    struct Profile {
        uint id;
        bytes32 username;
        bytes32 name;
        string bio;
    }
    mapping(uint => Profile) public profiles;
    mapping(bytes32 => uint) public usernames;
    mapping(address => uint) public addresses;
    uint latestUserId = 0;


    function createUser(address _address, bytes32 _username, bytes32 _name, string memory _bio) public onlyController returns(uint) {
        latestUserId++;

        profiles[latestUserId] = Profile(latestUserId, _username, _name, _bio);
        addresses[_address] = latestUserId;
        usernames[_username] = latestUserId;

        return latestUserId;
    }

    function getUserFromId(uint _userId) view public returns(uint, bytes32) {
        return (
        profiles[_userId].id,
        profiles[_userId].username
        );
    }

}