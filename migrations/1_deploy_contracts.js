
const Credit = artifacts.require("../contracts/Credit.sol");
const Main = artifacts.require("../contracts/Main.sol");
module.exports = (deployer) => {
   //deploy

    deployer.deploy(Main);

};