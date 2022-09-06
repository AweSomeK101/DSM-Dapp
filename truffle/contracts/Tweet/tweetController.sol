// SPDX-License-Identifier: MIT
pragma solidity >=0.8.16 <0.9.0;

import '../Util/baseController.sol';
import '../contractManager.sol';
import './tweetStorage.sol';
import "../User/userSTorage.sol";

contract TweetController is BaseController {

  function createTweet(string memory _text) public returns(uint) {
    ContractManager _manager = ContractManager(managerAddr);

    address _userStorageAddr = _manager.getAddress("UserStorage");
    UserStorage _userStorage = UserStorage(_userStorageAddr);

    uint _userId = _userStorage.addresses(msg.sender);
    require(_userId != 0, "User does not exist");

    address _tweetStorageAddr = _manager.getAddress("TweetStorage");
    TweetStorage _tweetStorage = TweetStorage(_tweetStorageAddr);

    return _tweetStorage.createTweet(_userId, _text);
  }
}
