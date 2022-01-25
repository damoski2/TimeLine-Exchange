import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BuyForm from './BuyForm';
import coinLogo from '../images/coinLogo.svg'
import SellForm from "./SellForm";

const Carousel = ({ daiTokenBalance, timeLineBalance, stakingBalance, buyTimeLine, sellTimeLine, ethBalance }) => {

  const [currentForm, setCurrentForm] = useState('buy')

  let content;

  
  content = currentForm === 'buy'? 
  <BuyForm buyTimeLine={buyTimeLine} currentForm={currentForm}  setCurrentForm={setCurrentForm} /> :
  <SellForm  currentForm={currentForm}  setCurrentForm={setCurrentForm} sellTimeLine={sellTimeLine} />

  useEffect(()=>{
    content = currentForm === 'buy'? 
  <BuyForm  buyTimeLine={buyTimeLine} currentForm={currentForm}  setCurrentForm={setCurrentForm} /> :
  <SellForm currentForm={currentForm}  setCurrentForm={setCurrentForm} sellTimeLine={sellTimeLine} />

  },[currentForm])

  return (
    <section style={{ background: "#080D2F", width: "100%"}}>
      <Container>
        <HeadingDiv>
          <DemoContainer>
              <DemoButton>Demo</DemoButton>
              <Span>Jump start your exchange now. {' '}{' '}&nbsp;🎉</Span>
          </DemoContainer>
          <H1>Welcome To TimeLine Exchange</H1>
          <P>
            Instantly Swap Any Cryptocurrencies of Choice for the TimeLine Coin.
          </P>
        </HeadingDiv>
        {content}
      </Container>
    </section>
  );
};

export default Carousel;

const Container = styled.div`
  width: 75%;
  margin: auto;
  display: flex;
  padding-top: 4em;
  justify-content: space-between;
  color: #ffffff;

  @media(max-width: 1024px){
    flex-direction: column;
  }
`;

const H1 = styled.h1`
  font-size: 72px;
  width: 80%;
  margin-top: .8em;

  @media(max-width: 1024px){
    width: 100%;
    text-align: center;
  }

  @media(max-width: 550px){
    font-size: 48px;
  }
`;

const P = styled.p`
  width: 75%;
  line-height: 1.7;
  font-size: 20px;
  @media(max-width: 1024px){
    width: 100%;
    text-align: center;
  }
  @media(max-width: 550px){
    font-size: 16px;
  }
`;

const Div = styled.div``;

const HeadingDiv = styled(Div)`
  width: 70%;
  align-self: center;

  @media(max-width: 1024px){
    width: 100%;
  }
`;

const Link = styled.a`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5em;
`;

const DemoContainer = styled(Div)`
  width: fit-content;
  padding: 8px 16px 8px 8px;
  display: flex;
  justify-content: space-between;
  background: rgba(249, 249, 249, 0.2);
  backdrop-filter: blur(300px);
  border-radius: 999px;
  @media(max-width: 1024px){
    margin: auto;
  }
`

const DemoButton = styled.button`
  color: #fff;
  width: 60px;
  height: 25px;
  border-radius: 999px;
  padding: 8px;
  background: #4655e1;
  font-size: 10px;
  border: none;
  line-height: 10px;
`

const Span = styled.span`
  font-size: 12px;
  color: #ffffff;
  align-self: center;
  margin-left: 1.3em;
`

const CoinImg = styled.img`
    
`