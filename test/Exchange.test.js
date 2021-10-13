const { assert } = require('chai');
const { default: Web3 } = require('web3');

const TimeLine = artifacts.require("TimeLine");
const DaiToken = artifacts.require("DaiToken");
const TokenVault = artifacts.require("TokenVault");


require('chai')
    .use(require('chai-as-promised'))
    .should();


const tokens = (n)=> web3.utils.toWei(n,'Ether')


contract('TimeLine Exchange', ([owner, investor])=>{

    let daiToken, timeLine, tokenVault;

    before(async()=>{
        timeLine = await TimeLine.new();
        daiToken = await DaiToken.new(timeLine.address);
        tokenVault = await TokenVault.new(timeLine.address,daiToken.address);

        //Transfer 1mill Timeline token to tokenVault
        await timeLine.transfer(tokenVault.address, tokens('1000000'));

        //Transfer all TimeLine tokens to DaiToken address
        await timeLine.transfer(daiToken.address, tokens('1000000'));

        //Transfer 100 daiToken to investor
        await daiToken.transfer(investor,tokens('100'), { from: owner });
    })

    describe('TimeLine Deployment', async()=>{
        it('Name', async()=>{
            let name = await timeLine.name();
            assert.equal(name,'TimeLine coin')
        })
    })

    describe('DaiToken Deployment', async()=>{
        it('Name', async()=>{
            let name = await daiToken.name();
            assert.equal(name,'Mock DAI Token')
        })

        it('Investor has token', async()=>{
            let investorBalance = await daiToken.balanceOf(investor);
            assert.equal(investorBalance.toString(), tokens('100'))
        })

        it('Daitoken has TimeLine token', async()=>{
            let daiTLBalance = await timeLine.balanceOf(daiToken.address);
            assert.equal(daiTLBalance.toString(), tokens('1000000'))
        })
    })

    describe('TokenVault Deployment', async()=>{
        it('Name', async()=>{
            let name = await tokenVault.name();
            assert.equal(name, 'Token Vault')
        })

        it('Has TimeLine Tokens', async()=>{
            let tvTLBalance = await timeLine.balanceOf(tokenVault.address);
            assert.equal(tvTLBalance.toString(), tokens('1000000'));
        })
    })


    describe('Buy Tokens', async()=>{
        let result;
        before(async()=>{
            //Purchase TimeLine Before each example
            result = await daiToken.buytimeline({ from: investor , value: web3.utils.toWei('1', 'ether') })
        })

        it('Allow investor to instantly purchase timeLine from daiToken for a fixed price', async()=>{
            //Check if investor recieves timeLine token after purchase
            let investorBalance = await timeLine.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('45'))

            let daiTokenBalance = await timeLine.balanceOf(daiToken.address)
            assert.equal(daiTokenBalance.toString(),tokens('999955'));
            daiTokenBalance = await web3.eth.getBalance(daiToken.address)
            assert.equal(daiTokenBalance.toString(), web3.utils.toWei('1','ether'))
        })
    })


    describe('Sell Token', async()=>{
        let result;
        before(async()=>{
            //Investor must approve token before purchase
            await timeLine.approve(daiToken.address, tokens('45'), { from: investor })
            result = await daiToken.selltimeline(tokens('45'), { from: investor })
        })

        it('Allow investor to instantly sell timeLine to daiToken for a fixed price', async()=>{
            let investorBalance = await timeLine.balanceOf(investor);
            assert.equal(investorBalance.toString(), tokens('0'))

            let daiTokenBalance = await timeLine.balanceOf(daiToken.address);
            assert.equal(daiTokenBalance.toString(), tokens('1000000'));
            daiTokenBalance = await web3.eth.getBalance(daiToken.address);
            assert.equal(daiTokenBalance.toString(), web3.utils.toWei('0','ether'))
        })
    })


    describe('Farming Timeline', async()=>{
        it('rewards investors for staking daiTokens', async()=>{
            let result;

            //Check investor balance before staking
            result = await daiToken.balanceOf(investor);
            assert.equal(result.toString(),tokens('100'), 'Investor dai wallet correct before staking');

            //Stake Dai Tokens
            await daiToken.approve(tokenVault.address,tokens('100'),{ from: investor })
            await tokenVault.stakeTimeLine(tokens('100'), { from: investor })

            //Check Staking result
            result = await daiToken.balanceOf(investor);
            assert.equal(result.toString(), tokens('0'),'Investor dai wallet after staking')

            result = await daiToken.balanceOf(tokenVault.address);
            assert.equal(result.toString(), tokens('100'),'Token vault dai balance correct after staking');

            result = await tokenVault.stakingBalance(investor);
            assert.equal(result.toString(), tokens('100'),'Token Vault dai balance correct after staking');

            result = await tokenVault.isStaking(investor);
            assert.equal(result.toString(), 'true','investor staking status after staking');

            //issue timeline
            await tokenVault.issueTimeLine({ from: owner });

            //Check Balance after issueance
            result = await timeLine.balanceOf(investor);
            assert.equal(result.toString(), tokens('100'),'Investor TimeLine wallet balance corret after issueance');

            //Ensure that only the owner can issue timeLine
            await tokenVault.issueTimeLine({ from: investor }).should.be.rejected;

            //Unstake timeLine
            await tokenVault.unStakeTimeLine({ from: investor });


            //Check result after unstaking
            result = await daiToken.balanceOf(investor);
            assert.equal(result.toString(), tokens('100'),'Investor dai wallet balance after unstaking');

            result = await tokenVault.stakingBalance(investor);
            assert.equal(result.toString(),tokens('0'),'investor staking balance after unstaking')


            result = await daiToken.balanceOf(tokenVault.address);
            assert.equal(result.toString(), tokens('0'), 'tokenValt dai balance after unstaking');

        })
    })

})