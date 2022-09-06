const TweetController = artifacts.require('TweetController')
const TweetStorage = artifacts.require('TweetStorage');
const ContractManager = artifacts.require('ContractManager')

module.exports = async function (deployer) {
  await deployer.deploy(TweetController);
  const tweetCtrlInst = await TweetController.deployed();
  const contractManagerInst = await ContractManager.deployed();
  const tweetStrgInst = await TweetStorage.deployed();

  await tweetCtrlInst.setManagerAddr(contractManagerInst.address);
  await contractManagerInst.setAddress("TweetController", tweetCtrlInst.address);
  await tweetStrgInst.setControllerAddr(tweetCtrlInst.address);
}