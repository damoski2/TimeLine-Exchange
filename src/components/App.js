import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import KYC from "../abis/KYC.json";
import NavBar from "./Navbar";
import styled from "styled-components";
import Carousel from "./Carousel";
import FarmingComponent from "./FarmingComponent";
import { GlobalContext } from '../context/GlobalState'




const App = (props)=>{

  const { buyTimeLine, sellTimeLine, stakeTokens, unstakeTokens } = props

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
   } = useContext(GlobalContext)

    return (
        <AppContainer>
          <NavBar account={account} userConnected={userConnected} />
          <Carousel
            stakingBalance={stakingBalance}
            buyTimeLine={buyTimeLine}
            sellTimeLine={sellTimeLine}
          />
          <FarmingComponent
            stakingBalance={stakingBalance}
            stakeTokens={stakeTokens}
            unstakeTokens={unstakeTokens}
          />
        </AppContainer>
    );
}

export default App;

const AppContainer = styled.main`
  width: 100%;
`;
