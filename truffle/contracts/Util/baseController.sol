// SPDX-License-Identifier: MIT
pragma solidity >=0.8.16 <0.9.0;

import './owned.sol';

contract BaseController is Owned {
   // The Contract Manager's address
  address managerAddr;

  function setManagerAddr(address _managerAddr) public onlyOwner {
    managerAddr = _managerAddr;
  }

}
