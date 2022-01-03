import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import KycComponent from "./Pages/KycComponent";
import Web3 from "web3";
import DaiToken from "../abis/DaiToken.json";
import TimeLine from "../abis/TimeLine.json";
import TokenVault from "../abis/TokenVault.json";
import TimeLineSale from "../abis/TimeLineSale.json";
import KYC from "../abis/KYC.json";
import NavBar from "./Navbar";
import styled from "styled-components";
import Carousel from "./Carousel";
import { GlobalContext } from "../context/GlobalState";

const Paths = ()=>{

  const {
    account,
    daiToken,
    timeLine,
    kyc,
    ethBalance,
    daiTokenBalance,
    tokenVault,
    timeLineBalance,
    stakingBalance,
    loading,
    Mstate,
    userConnected,
    setData,
    notLoading,
  } = useContext(GlobalContext);

  useEffect(() => {
  const loadWeb3 = async()=>{
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      console.log('ddd')
    }
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadBlockChainData = async()=> {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setData('account', accounts[0])
   /*  setState({
      ...state,
      account: accounts[0],
    }); */
    //this.setState({ account: accounts[0] });
    const ethBalance = await web3.eth.getBalance(account);
    setData('ethBalance', ethBalance)
    /* setState({ ...state, ethBalance }); */
    //this.setState({ ethBalance });
    const networkId = await web3.eth.net.getId();

    //Check and set variable if User wallet is connected
    checkAccount()
      ? setData( 'userConnected', true )
      : setData('userConnected', false );

    //Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(
        DaiToken.abi,
        daiTokenData.address
      );
      setData('daiToken', daiToken);

      let daiTokenBalance = await daiToken.methods.balanceOf(account).call();
      setData('daiTokenBalance', daiTokenBalance.toString());
    } else {
      window.alert("Daitoken not deployed to the network.");
    }

    //Load TimeLine
    const timeLineData = TimeLine.networks[networkId];
    if (timeLineData) {
      const timeLine = new web3.eth.Contract(
        TimeLine.abi,
        timeLineData.address
      );
      setData('timeLine', timeLine);

      let timeLineBalance = await timeLine.methods.balanceOf(account).call();
      setData('timeLineBalance', timeLineBalance.toString());
    } else {
      window.alert("TimeLine not deployed to the network.");
    }

    //Load TokenVault
    const tokenVaultData = TokenVault.networks[networkId];
    if (tokenVaultData) {
      const tokenVault = new web3.eth.Contract(
        TokenVault.abi,
        tokenVaultData.address
      );
      setData('tokenVault', tokenVault);
      let stakingBalance = await tokenVault.methods
        .stakingBalance(account)
        .call();
      setData(
        'stakingBalance', stakingBalance === null ? 0 : stakingBalance.toString(),
      );
    } else {
      window.alert("TokenVault not deployed to the network");
    }

    //Load TimeLineSale
    const timeLineSaleData = TimeLineSale.networks[networkId];
    if (timeLineSaleData) {
      const timeLineSale = new web3.eth.Contract(
        TimeLineSale.abi,
        timeLineSaleData.address
      );
      setData('timeLineSale', timeLineSale);
    } else {
      window.alert("TimeLineSale not deployed to the network");
    }

    //Load KYC contract
    const kycData = KYC.networks[networkId];
    if (kycData) {
      const kyc = new web3.eth.Contract(KYC.abi, kycData.address);
      setData('kyc',kyc);
    } else {
      window.alert("KYC not deployed to the network");
    }

    setData( 'loading',false);
  }
   loadWeb3();
   loadBlockChainData();
  },[]);

  /*   const { account, daiToken, timeLine, 
    tokenVault, timeLineSale, kyc, ethBalance, daiTokenBalance,
     timeLineBalance, stakingBalance, loading, Mstate, userConnected } = state; */

  function storeAccount(_account, _ethbalance) {
    if (typeof window != "undefined") {
      if (localStorage.getItem("timeline_user")) {
        return;
      }
      localStorage.setItem(
        "timeline_user",
        JSON.stringify({
          account: _account,
          ethBalance: _ethbalance,
        })
      );
    }
  }

  function checkAccount() {
    if (typeof window != "undefined") {
      if (!localStorage.getItem("timeline_user")) {
        return false;
      }
      return JSON.parse(localStorage.getItem("timeline_user"));
    }
  }



  const buyTimeLine = (daiAmount) => {
    setData('loading', true );
    daiToken.methods
      .buytimeline()
      .send({ value: daiAmount, from: account })
      .on("transactionHash", (hash) => {
        setData('loading', false);
      });
  };

  const sellTimeLine = (timeLineAmount) => {
    setData('loading', true);
    timeLine.methods
      .approve(daiToken.address, timeLineAmount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        daiToken.methods
          .selltimeline(timeLineAmount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setData('loading', false);
          });
      });
  };

  const stakeTokens = (amount) => {
    setData('loading', true);
    daiToken.methods
      .approve(tokenVault.address, amount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        tokenVault.methods
          .stakeTimeLine(amount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setData('loading', false);
          });
      });
  };

  const unstakeTokens = (amount) => {
    setData('loading', true);
    tokenVault.methods
      .unStakeTimeLine()
      .send({ from: account })
      .on("transactionHash", (hash) => {
        setData('loading', false);
      });
  };

  const addPioneer = (name) => {
    setData('loading', true);
    kyc.methods
      .invest(name)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        /*   console.log(hash);
        console.log("dd"); */
        setData('Mstate', true);
        setData('loading', false);
        //Trigger Modal
      });
  };

  return window.web3?(
    <Routes>
      <Route
        path="/"
        element={
          <App
            buyTimeLine={buyTimeLine}
            sellTimeLine={sellTimeLine}
            stakeTokens={stakeTokens}
            unstakeTokens={unstakeTokens}
          />
        }
      />
      <Route
        path="/pioneers/kyc"
        element={
          <KycComponent addPioneer={addPioneer} />
        }
      />
    </Routes>
  ) :(
    <div>
      No Web 3 loaded
    </div>
  )
}

export default Paths;

const AppContainer = styled.main`
  width: 100%;
`;

/*
  
  return (
    <Routes>
          <Route path="/" element={  <App data={data} buyTimeLine={buyTimeLine} sellTimeLine={sellTimeLine} stakeTokens={stakeTokens} unstakeTokens={unstakeTokens} /> } />   
          <Route path="/pioneers/kyc" element={ <KycComponent /> } />
    </Routes>
  );
};
  */
