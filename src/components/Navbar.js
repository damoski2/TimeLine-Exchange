import React, { useContext } from "react";
import styled from "styled-components";
import navLogo from "../images/navLogo.svg";
import Identicon from "identicon.js";
import Connection from './Connection';
import { GlobalContext } from "../context/GlobalState.js";


const Navbar = ({ connectAccount }) => {

  const {
    web3,
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
  } = useContext(GlobalContext);

  console.log(userConnected)

  const renderOut = userConnected ? (
    <>
      <SmallText>{account}</SmallText>
      {account?(
        <img
          className="ml-3"
          width="30"
          alt=""
          height="30"
          src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
        />
      ) : (
        <span></span>
      )}
    </>
  ) : (
    <Connection />
  );

  return (
    <NavContainer>
      <Logo src="https://res.cloudinary.com/oyindacodes/image/upload/v1634377005/Group_10_uqdfhn.svg" />
      <Div>
          {renderOut}
      </Div>
      <Hambuger></Hambuger>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 4em;
  background: #080d2f;
  width: 100%;
  height: 76px;
  border-bottom: 0.1px solid rgba(245, 246, 255, 0.1);
`;

const Logo = styled.img`
  max-width: 200px;
`;

const Hambuger = styled.div`
  display: none;
  width: 30px;
  height: 30px;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Div = styled.div`
  align-self: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SmallText = styled.small`
  font-size: 12px;
  color: #e5e5e5;
`;

const IdenticonImg = styled.img`
  width: 30px;
  height: 30px;
`;


