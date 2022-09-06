const UserStorage = artifacts.require("UserStorage");
const TweetStorage = artifacts.require('TweetStorage');

module.exports = async function (deployer){
    await deployer.deploy(UserStorage);
    await deployer.deploy(TweetStorage);
}