const UserController = artifacts.require('UserController')
const UserStorage = artifacts.require('UserStorage');
const ContractManager = artifacts.require('ContractManager')

module.exports = async function (deployer) {
  await deployer.deploy(UserController);
  const userCtrlInst = await UserController.deployed();
  const contractManagerInst = await ContractManager.deployed();
  const userStrgInst = await UserStorage.deployed();

  await userCtrlInst.setManagerAddr(contractManagerInst.address);
  await contractManagerInst.setAddress("UserController", userCtrlInst.address);
  await userStrgInst.setControllerAddr(userCtrlInst.address);
}