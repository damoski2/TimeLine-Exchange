const TokenVault = artifacts.require("TokenVault");

module.exports = async function(callback){
    let tokenVault = await TokenVault.deployed()
    await tokenVault.issueTimeLine()

    console.log('token issued')
    callback()
}