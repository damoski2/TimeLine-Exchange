import React from "react";
import styled from "styled-components";
import Vault from "./Vault";

const FarmingComponent = ({
  daiTokenBalance,
  timeLineBalance,
  stakingBalance,
  stakeTokens,
  unstakeTokens,
  ethBalance
}) => {
  return (
    <section style={{ background: "#080D2F", width: "100%", paddingBottom: "2em"}}>
      <Container>
        <Vault
          daiTokenBalance={daiTokenBalance}
          timeLineBalance={timeLineBalance}
          stakingBalance={stakingBalance}
          stakeTokens={stakeTokens}
          unstakeTokens={unstakeTokens}
          ethBalance={ethBalance}
        />
        <HeadingDiv>
          <DemoContainer>
            <DemoButton>Demo</DemoButton>
            <Span>Jump start your exchange now. &nbsp;🎉</Span>
          </DemoContainer>
          <H1>Farm TimeLine</H1>
          <P>
            Use Our Decentralized Financial Ledger to Gain TimeLine as Interest
            for Deposited Tokens
          </P>
        </HeadingDiv>
      </Container>
    </section>
  );
};

const Container = styled.div`
  width: 75%;
  margin: auto;
  display: flex;
  flex-direction: row;
  padding-top: 8em;
  justify-content: space-between;
  color: #ffffff;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`;

const H1 = styled.h1`
  font-size: 72px;
  width: 100%;
  margin-top: 0.8em;
  text-align: right;
  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }

  @media (max-width: 550px) {
    font-size: 48px;
  }
`;

const P = styled.p`
  width: 80%;
  text-align: right;
  line-height: 1.7;
  font-size: 20px;
  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }
  @media (max-width: 550px) {
    font-size: 16px;
  }
`;

const Div = styled.div``;

const HeadingDiv = styled(Div)`
  width: 50%;
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const DemoContainer = styled(Div)`
  width: fit-content;
  padding: 8px 16px 8px 8px;
  display: flex;
  justify-content: space-between;
  background: rgba(249, 249, 249, 0.2);
  backdrop-filter: blur(300px);
  border-radius: 999px;
  @media (max-width: 1024px) {
    margin: auto;
  }
`;

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
`;

const Span = styled.span`
  font-size: 12px;
  color: #ffffff;
  align-self: center;
  margin-left: 1.3em;
`;

export default FarmingComponent;
