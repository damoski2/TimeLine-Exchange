const { assert } = require("chai");
const { default: Web3 } = require("web3");

const TimeLine = artifacts.require("TimeLine");
const DaiToken = artifacts.require("DaiToken");
const TokenVault = artifacts.require("TokenVault");
const TimeLineSale = artifacts.require("TimeLineSale");
const KYC = artifacts.require("KYC");

require("chai")
  .use(require("chai-as-promised"))
  .should();

const tokens = (n) => web3.utils.toWei(n, "Ether");

contract("TimeLine Exchange", (accounts) => {
  let daiToken,
    timeLine,
    tokenVault,
    timeLineSale,
    kyc,
    timeLineSaleAvailable = 1500000,
    owner = accounts[0],
    investor = accounts[1],
    pioneer1 = accounts[2],
    pioneer2 = accounts[3],
    pioneer3 = accounts[4],
    pioneer4 = accounts[5],
    pioneer5 = accounts[6],
    pioneer6 = accounts[7];
  before(async () => {
    timeLine = await TimeLine.new();
    daiToken = await DaiToken.new(timeLine.address);
    tokenVault = await TokenVault.new(timeLine.address, daiToken.address);
    timeLineSale = await TimeLineSale.new(timeLine.address);
    kyc = await KYC.new(timeLine.address);

    //Transfer 1mill Timeline token to tokenVault
    await timeLine.transfer(tokenVault.address, tokens("500000"));

    //Transfer all TimeLine tokens to DaiToken address
    await timeLine.transfer(daiToken.address, tokens("500000"));

    //Transfer 100 daiToken to investor
    await daiToken.transfer(investor, tokens("100"), { from: owner });

    //Transfer 1500000 tokens to timelineSale for Transactions
    await timeLine.transfer(timeLineSale.address, tokens("1500000"), {
      from: owner,
    });

    await timeLine.transfer(kyc.address, tokens("400000"));
  });

  describe("TimeLine Deployment", async () => {
    it("Name", async () => {
      let name = await timeLine.name();
      assert.equal(name, "TimeLine coin");

      /* let balance = await timeLine.balanceOf(owner);
      assert.equal(balance.toString(),'0') */
    });
  });

  describe("DaiToken Deployment", async () => {
    it("Name", async () => {
      let name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });

    it("Investor has token", async () => {
      let investorBalance = await daiToken.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("100"));
    });

    it("Daitoken has TimeLine token", async () => {
      let daiTLBalance = await timeLine.balanceOf(daiToken.address);
      assert.equal(daiTLBalance.toString(), tokens("500000"));
    });
  });

  describe("TokenVault Deployment", async () => {
    it("Name", async () => {
      let name = await tokenVault.name();
      assert.equal(name, "Token Vault");
    });

    it("Has TimeLine Tokens", async () => {
      let tvTLBalance = await timeLine.balanceOf(tokenVault.address);
      assert.equal(tvTLBalance.toString(), tokens("500000"));
    });
  });

  describe("TimeLineSale Deployement", async () => {
    it("has TimeLine tokens", async () => {
      let balance = await timeLine.balanceOf(timeLineSale.address);
      assert.equal(balance.toString(), tokens("1500000"));
    });
  });

  describe("Buy Tokens", async () => {
    let result;
    before(async () => {
      //Purchase TimeLine Before each example
      result = await daiToken.buytimeline({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      });
    });

    it("Allow investor to instantly purchase timeLine from daiToken for a fixed price", async () => {
      //Check if investor recieves timeLine token after purchase
      let investorBalance = await timeLine.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("45"));

      let daiTokenBalance = await timeLine.balanceOf(daiToken.address);
      assert.equal(daiTokenBalance.toString(), tokens("499955"));
      daiTokenBalance = await web3.eth.getBalance(daiToken.address);
      assert.equal(daiTokenBalance.toString(), web3.utils.toWei("1", "ether"));
    });
  });

  describe("TimeLineSale Buy Tokens", async () => {
    let result;
    before(async () => {
      //Purchase TimeLine from TimeLineSale
      result = await timeLineSale.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      });
    });

    it("Allows investor to purchase Timeline from the Public timeLineSale for a fixed price", async () => {
      let balance = await timeLine.balanceOf(timeLineSale.address);
      assert.equal(balance.toString(), tokens("1499955"));

      balance = await web3.eth.getBalance(timeLineSale.address);
      assert.equal(balance.toString(), web3.utils.toWei("1", "ether"));
    });
  });

  describe("Sell Token", async () => {
    let result;
    before(async () => {
      //Investor must approve token before purchase
      try {
        await timeLine.approve(daiToken.address, tokens("45"), {
          from: investor,
        });
        result = await daiToken.selltimeline(tokens("45"), { from: investor });
      } catch (e) {
        console.log(e);
      }
    });

    it("Allow investor to instantly sell timeLine to daiToken for a fixed price", async () => {
      let investorBalance = await timeLine.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("45"));

      let daiTokenBalance = await timeLine.balanceOf(daiToken.address);
      assert.equal(daiTokenBalance.toString(), tokens("500000"));
      daiTokenBalance = await web3.eth.getBalance(daiToken.address);
      assert.equal(daiTokenBalance.toString(), web3.utils.toWei("0", "ether"));
    });
  });

  describe("Farming Timeline", async () => {
    it("rewards investors for staking daiTokens", async () => {
      let result;

      //Check investor balance before staking
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Investor dai wallet correct before staking"
      );

      //Stake Dai Tokens
      await daiToken.approve(tokenVault.address, tokens("100"), {
        from: investor,
      });
      await tokenVault.stakeTimeLine(tokens("100"), { from: investor });

      //Check Staking result
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "Investor dai wallet after staking"
      );

      result = await daiToken.balanceOf(tokenVault.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Token vault dai balance correct after staking"
      );

      result = await tokenVault.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Token Vault dai balance correct after staking"
      );

      result = await tokenVault.isStaking(investor);
      assert.equal(
        result.toString(),
        "true",
        "investor staking status after staking"
      );

      //issue timeline
      await tokenVault.issueTimeLine({ from: owner });

      //Check Balance after issueance
      result = await timeLine.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("145"),
        "Investor TimeLine wallet balance corret after issueance"
      );

      //Ensure that only the owner can issue timeLine
      await tokenVault.issueTimeLine({ from: investor }).should.be.rejected;

      //Unstake timeLine
      await tokenVault.unStakeTimeLine({ from: investor });

      //Check result after unstaking
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Investor dai wallet balance after unstaking"
      );

      result = await tokenVault.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor staking balance after unstaking"
      );

      result = await daiToken.balanceOf(tokenVault.address);
      assert.equal(
        result.toString(),
        tokens("0"),
        "tokenValt dai balance after unstaking"
      );
    });
  });

  describe("Know Your Customer", async () => {
    /*  let result;
    before(async () => {
        result = await kyc.invest("James",{ from: pioneer1 })
    }); */

    it("Gather limited Pioneers Details", async () => {
      /* let name = await kyc.investors(pioneer1);
            assert.equal(name,"James") */

      await kyc.invest("Sarah", { from: pioneer2 });
      let name = await kyc.stakers(pioneer2);
      assert.equal(name, true);

      await kyc.invest("Maddie", { from: pioneer3 });
      name = await kyc.stakers(pioneer3);
      assert.equal(name, true);

      await kyc.invest("Rick", { from: pioneer4 });
      name = await kyc.stakers(pioneer4);
      assert.equal(name, true);

      /*   await kyc.invest("Carl", { from: pioneer5 })
            name = await kyc.stakers(pioneer5)
            assert.equal(name,"Carl") */

      /* await kyc.invest("Kaylie", { from: pioneer6 })
            name = await kyc.stakers(pioneer6)
            assert.equal(name,"Kaylie") */

      //Reward pioneers
      await kyc.rewardPioneers({ from: owner });
      let balance = await timeLine.balanceOf(pioneer2);
      //console.log(balance);
      assert.equal(balance.toString(), tokens("4000"));
    });

    it("Return Active Pioneers", async () => {
      let returnedInvestors = await kyc.returnPioneer("Rick");
      assert.equal(returnedInvestors, true);
    });
  });


});
