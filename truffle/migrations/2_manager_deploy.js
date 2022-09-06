const ContractManager = artifacts.require('ContractManager')
const UserStorage = artifacts.require('UserStorage');
const TweetStorage = artifacts.require('TweetStorage');

module.exports = async function (deployer) {
  await deployer.deploy(ContractManager);
  const contractManagerInst = await ContractManager.deployed();

  const usInst = await UserStorage.deployed();
  const tsInst = await TweetStorage.deployed();

  await contractManagerInst.setAddress("UserStorage", usInst.address)  
  await contractManagerInst.setAddress("TweetStorage", tsInst.address)
}