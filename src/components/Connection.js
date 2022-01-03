import React, { useEffect, useState } from 'react';
import { useWallet, UseWalletProvider } from 'use-wallet'
import styled from 'styled-components';
import Web3 from "web3";



function Connection(){



useEffect(()=>{
 
},[])

    const wallet = useWallet()

    const connectWallet = async(e)=>{
      e.preventDefault()
      await wallet.connect()
    }

    return(
        <div>
            <ConnectBtn onClick={connectWallet} >Connect Wallet</ConnectBtn>        </div>
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