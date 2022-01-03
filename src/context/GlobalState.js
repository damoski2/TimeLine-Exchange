import React,{ createContext, useReducer } from 'react';
import AppReducer from './AppReducer';



const initialState = {
    account: "",
    daiToken: {},
    timeLine: {},
    tokenVault: {},
    timeLineSale: {},
    kyc: {},
    ethBalance: "0",
    daiTokenBalance: "0",
    timeLineBalance: "0",
    stakingBalance: "0",
    loading: true,
    Mstate: false,
    userConnected: false,
}


export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children})=>{

    const [state, dispatch] = useReducer(AppReducer, initialState)

    const notLoading = ()=>{
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


    return(
        <GlobalContext.Provider value={{
            account: state.account,
            daiToken: state.daiToken,
            timeLine: state.timeLine,
            tokenVault: state.tokenVault,
            timeLineSale: state.timeLineSale,
            kyc: state.kyc,
            ethBalance: state.ethBalance,
            daiTokenBalance: state.daiTokenBalance,
            timeLineBalance: state.timeLineBalance,
            stakingBalance: state.stakingBalance,
            loading: state.loading,
            Mstate: state.Mstate,
            userConnected: state.userConnected,
            notLoading,
            setData
        }}>
            {children}
        </GlobalContext.Provider>
    )
}