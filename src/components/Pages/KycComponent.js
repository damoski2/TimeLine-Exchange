import React, { useContext } from 'react'
import Navbar from '../Navbar';
import styled from 'styled-components'
import Body from '../PioneerComponent/Body'
import { GlobalContext } from '../../context/GlobalState'



const KycComponent = ({ addPioneer }) => {

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
            <Navbar account={account} />
            <Body account = {account} addPioneer={addPioneer} Mstate={Mstate} />
        </AppContainer>
    )
}

export default KycComponent

const AppContainer = styled.main`
  width: 100%;
`;

