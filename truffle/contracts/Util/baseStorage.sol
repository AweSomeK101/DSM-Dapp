// SPDX-License-Identifier: MIT
pragma solidity >=0.8.16 <0.9.0;

import "./owned.sol";

contract BaseStorage is Owned {
  address public controllerAddr;

  modifier onlyController() {
    require(msg.sender == controllerAddr);
    _;
  }

  function setControllerAddr(address _controllerAddr) public onlyOwner {
    controllerAddr = _controllerAddr;
  }
}
