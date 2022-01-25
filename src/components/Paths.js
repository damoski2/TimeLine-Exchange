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

const Paths = () => {
  const {
    web3,
    account,
    setAccount,
    daiToken,
    setDaiToken,
    timeLine,
    setTimeLine,
    timeLineSale,
    setTimeLineSale,
    kyc,
    setKyc,
    ethBalance,
    setEthBalance,
    daiTokenBalance,
    setDaiTokenBalance,
    tokenVault,
    setTokenVault,
    timeLineBalance,
    setTimeLineBalance,
    stakingBalance,
    setStakingBalance,
    loading,
    setLoading,
    Mstate,
    setMstate,
    userConnected,
    setUserConnected,
  } = useContext(GlobalContext);

  //console.log(web3);

  useEffect(() => {
    
  }, []);

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
    setLoading(true)
    daiToken.methods
      .buytimeline()
      .send({ value: daiAmount, from: account })
      .on("transactionHash", (hash) => {
        setLoading(false)
      });
  };

  const sellTimeLine = (timeLineAmount) => {
    setLoading(true)
    timeLine.methods
      .approve(daiToken.address, timeLineAmount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        daiToken.methods
          .selltimeline(timeLineAmount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setLoading(false)
          });
      });
  };

  const stakeTokens = (amount) => {
    setLoading(true)
    daiToken.methods
      .approve(tokenVault.address, amount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        tokenVault.methods
          .stakeTimeLine(amount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setLoading(false)
          });
      });
  };

  const unstakeTokens = (amount) => {
    setLoading(true)
    tokenVault.methods
      .unStakeTimeLine()
      .send({ from: account })
      .on("transactionHash", (hash) => {
        setLoading(false)
      });
  };

  const addPioneer = (name) => {
    setLoading(true)
    kyc.methods
      .invest(name)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        /*   console.log(hash);
        console.log("dd"); */
        setMstate(true)
        setLoading(false)
        //Trigger Modal
      });
  };

  return loading ? (
    <div>No Web 3 loaded</div>
  ) : (
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
        element={<KycComponent addPioneer={addPioneer} />}
      />
    </Routes>
  );
};

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
