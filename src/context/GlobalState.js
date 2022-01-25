import React,{ createContext, useReducer, useEffect, useState } from 'react';
import AppReducer from './AppReducer';
import Web3 from 'web3';
import DaiToken from "../abis/DaiToken.json";
import TimeLine from "../abis/TimeLine.json";
import TokenVault from "../abis/TokenVault.json";
import TimeLineSale from "../abis/TimeLineSale.json";
import KYC from "../abis/KYC.json";



const initialState = {
    web3: null,
    setWeb3: ()=>{},
    account: "0x00000000000000000000000000000000000000",
    setAccount: ()=>{},
    daiToken: {},
    setDaiToken: ()=>{},
    timeLine: {},
    setTimeLine: ()=>{},
    tokenVault: {},
    setTokenVault: ()=>{},
    timeLineSale: {},
    setTimeLineSale: ()=>{},
    kyc: {},
    setKyc: ()=>{},
    ethBalance: "0",
    setEthBalance: ()=>{},
    daiTokenBalance: "0",
    setDaiTokenBalance: ()=>{},
    timeLineBalance: "0",
    setTimeLineBalance: ()=>{},
    stakingBalance: "0",
    setStakingBalance: ()=>{},
    loading: true,
    setLoading: ()=>{},
    Mstate: false,
    setMstate: ()=>{},
    userConnected: false,
    setUserConnected: ()=>{},
}


export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children})=>{
    

    //const [state, dispatch] = useReducer(AppReducer, initialState)
    const [web3, setWeb3] = useState(null)
    const [account, setAccount] = useState(web3? web3.eth.getAccounts()[0]: '0x00000000000000000000000000000000000000')
    const [daiToken, setDaiToken] = useState({})
    const [timeLine, setTimeLine] = useState({})
    const [tokenVault, setTokenVault] = useState({})
    const [timeLineSale, setTimeLineSale] = useState({})
    const [kyc, setKyc] = useState({})
    const [ethBalance, setEthBalance] = useState('0')
    const [daiTokenBalance, setDaiTokenBalance] = useState('0')
    const [timeLineBalance, setTimeLineBalance] = useState('0')
    const [stakingBalance, setStakingBalance] = useState('0')
    const [loading, setLoading] = useState(true)
    const [Mstate, setMstate] = useState(false)
    const [userConnected, setUserConnected] = useState(false)


  useEffect(()=>{
    const loadAccount = async()=>{
    /*     if(web3){
            console.log(web3);
            const accounts = await web3.eth.getAccounts();
            let acc = await web3.utils.toChecksumAddress(accounts[0])
            setAccount(acc);
            
        } */
        setLoading(false)
    }
    loadAccount()
  },[])

  useEffect(() => {
    const loadBlockChainData = async () => {
      if (web3 && (account != '0' && account !='0x0' && account != '0x00000000000000000000000000000000000000' && account != undefined)){

      setLoading(true)  
      account == '0x00000000000000000000000000000000000000'?
       setUserConnected(false) : setUserConnected(true)

        console.log(account)
        const ethBalance = await web3.eth.getBalance(account);
        console.log(ethBalance)
        setEthBalance(ethBalance)
        const networkId = await web3.eth.net.getId();
        //Load DaiToken
        const daiTokenData = DaiToken.networks[networkId];
        if (daiTokenData) {
          const daiToken = new web3.eth.Contract(
            DaiToken.abi,
            daiTokenData.address
          );
          setDaiToken(daiToken);

          let daiTokenBalance = await daiToken.methods
            .balanceOf(account)
            .call();
          setDaiTokenBalance(daiTokenBalance.toString());
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
          setTimeLine(timeLine);

          let timeLineBalance = await timeLine.methods
            .balanceOf(account)
            .call();
          setTimeLineBalance(timeLineBalance.toString())
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
          setTokenVault(tokenVault)
          let stakingBalance = await tokenVault.methods
            .stakingBalance(account)
            .call();
          setStakingBalance(stakingBalance.toString())
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
          setTimeLineSale(timeLineSale)
        } else {
          window.alert("TimeLineSale not deployed to the network");
        }

        //Load KYC contract
        const kycData = KYC.networks[networkId];
        if (kycData) {
          const kyc = new web3.eth.Contract(KYC.abi, kycData.address);
          setKyc(kyc);
        } else {
          window.alert("KYC not deployed to the network");
        }
        setLoading(false)
      } else {
        console.log("dd");
      }
    };
    loadBlockChainData();
  }, [account]);



/*     const notLoading = ()=>{
        dispatch({
            type: 'LOADING_FALSE'
        })
    }

    const setData = (key,_data)=>{
        dispatch({
            type: 'SET_DATA',
            payload: {
                key: key,
                _data: _data
            }
        })
    }

    const setAddress=(data)=>{
        dispatch({
            type: 'SET_ADDRESS',
            payload: data
        })
    }

    const showData=()=>{
        console.log(initialState)
    } */

    return(
        <GlobalContext.Provider value={{
            web3,
            setWeb3,
            account,
            setAccount,
            daiToken,
            setDaiToken,
            timeLine,
            setTimeLine,
            tokenVault,
            setTokenVault,
            timeLineSale,
            setTimeLineSale,
            kyc,
            setKyc,
            ethBalance,
            setEthBalance,
            daiTokenBalance,
            setDaiTokenBalance,
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
        }}>
            {children}
        </GlobalContext.Provider>
    )
}