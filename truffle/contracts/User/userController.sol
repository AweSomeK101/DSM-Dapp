// SPDX-License-Identifier: MIT
pragma solidity >=0.8.16 <0.9.0;

import '../Util/baseController.sol';
import '../contractManager.sol';
import './userStorage.sol';

contract UserController is BaseController {
  function createUser(bytes32 _username, bytes32 _name, string memory _bio) public returns(uint) {
    ContractManager _manager = ContractManager(managerAddr);

    address _userStorageAddr = _manager.getAddress("UserStorage");
    UserStorage _userStorage = UserStorage(_userStorageAddr);

    require(_userStorage.usernames(_username) == 0, "Username already taken");
    require(_userStorage.addresses(msg.sender) == 0, "Account already created");

    return _userStorage.createUser(msg.sender, _username, _name, _bio);
  }
}
