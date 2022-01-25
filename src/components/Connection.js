import React, { useEffect, useState, useContext } from 'react';
import { useWallet, UseWalletProvider } from 'use-wallet'
import styled from 'styled-components';
import Web3 from "web3";
import { GlobalContext } from '../context/GlobalState'



function Connection(){

  const { account, web3, setWeb3, setAccount, setLoading } = useContext(GlobalContext);

    const wallet = useWallet()

    const loadAccount = async()=>{
          setWeb3(new Web3(window.ethereum))
          setLoading(false)
      }
      

    const connectWallet = async(e)=>{
      await loadAccount()
      console.log('fff')
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log(accounts)
      setAccount(accounts[0])
    }

    return(
        <div>
            <ConnectBtn onClick={connectWallet} >Connect Wallet</ConnectBtn></div>
    )
  }


export default ()=>(
    <UseWalletProvider
    chainId={5777}
    connectors={{
      // This is how connectors get configured
      provided: { provider: window.cleanEthereum },
    }}
  >
    <Connection />
  </UseWalletProvider>
)

const ConnectBtn = styled.button`
    padding: 10px 22px;
    background-color: #4655e1;
    color: #fff;
    border: none;
    border-radius: 4px;

    :focus{
        outline: none;
    }
`;