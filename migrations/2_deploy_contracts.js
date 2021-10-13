const TimeLine = artifacts.require("TimeLine");
const DaiToken = artifacts.require("DaiToken");
const TokenVault = artifacts.require("TokenVault");


module.exports = async function(deployer, network, accounts){


    //Deploy TimeLine
    await deployer.deploy(TimeLine);
    const timeLine = await TimeLine.deployed();

    //Deploy DaiToken
    await deployer.deploy(DaiToken, timeLine.address);
    const daiToken = await DaiToken.deployed()

    //Deploy TokenFarm
    await deployer.deploy(TokenVault,timeLine.address,daiToken.address);
    const tokenVault = await TokenVault.deployed();

    //Transfer all TimeLine token to TokenVault
    await timeLine.transfer(tokenVault.address, '1000000000000000000000000');

    //Transfer all TimeLine tokens to DaiToken address
    await timeLine.transfer(daiToken.address, '1000000000000000000000000');

    //transfer 100 Dai token to investor
    await daiToken.transfer(accounts[1], '100')

}