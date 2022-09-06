// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16 <0.9.0;

import '../Util/baseStorage.sol';

contract TweetStorage is BaseStorage {
    struct Tweet {
        uint id;
        string text;
        uint userId;
        uint postedAt;
    }
    mapping(uint => Tweet) public tweets;
    mapping(uint => uint[]) public userTweetIds;

    event NewTweet(
        uint id,
        string text,
        uint userId,
        uint postedAt
    );

    uint latestTweetId = 0;

    function createTweet(uint _userId, string memory _text) public onlyController returns(uint) {
        latestTweetId++;

        tweets[latestTweetId] = Tweet(latestTweetId, _text, _userId, block.timestamp);
        userTweetIds[_userId].push(latestTweetId);

        emit NewTweet(latestTweetId, _text, _userId, block.timestamp);
        return latestTweetId;
    }

    function getTweetIdsFromUser(uint _userId) view public returns(uint[] memory){
        return userTweetIds[_userId];
    }

    function getNumTweets() view public returns(uint) {
        return latestTweetId;
    }
}