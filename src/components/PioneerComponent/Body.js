import React,{useState} from "react";
import styled from "styled-components";
import ManageSvg from "./svg/ManageSvg";
import RecurringSvg from "./svg/RecurringSvg";
import SecureSvg from "./svg/SecureSvg";
import bgImg from '../../images/bgImage.jpg'
import ModalMessage from './ModalMessage';


const Body = ({ account, addPioneer, Mstate }) => {

  const [name,setName] = useState('')

  const submit = (e)=>{
    e.preventDefault();
    addPioneer(name);
  }

  const showMessage = (message)=>( <ModalMessage message={message} Mstate={Mstate} /> );

  return (
    <OverallContainer>
      <OuterContainer>
        <DetailDiv>
          <H3>A trusted cryptocurrency platform</H3>
          <P>Here a few Reason You Should Choose and invest in TimeLine</P>
        </DetailDiv>

        <FlexContainer>
          <InnerFlex>
            <SecureSvg style={{ alignSelf: "center" }} />
            <H5>Future Digital</H5>
            <P2>
              We ensure that TimeLine is a revolutionary digital assets as it
              exist on a quantum scope of being both a fungible and non-fungible
              token.
            </P2>
          </InnerFlex>
          {showMessage("Pioneer Successfully Added!")}
          <InnerFlex>
            <RecurringSvg style={{ alignSelf: "center" }} />
            <H5>Protected By insurance</H5>
            <P2>
              TimeLine maintains crypto insurance and all USD cash balances are
              covered by FDIC insurance, up to a maximum of $250,000.
            </P2>
          </InnerFlex>

          <InnerFlex>
            <ManageSvg style={{ alignSelf: "center" }} />
            <H5>Industry best practices</H5>
            <P2>
              TimeLine supports a variety of the most popular digital
              currencies.
            </P2>
          </InnerFlex>
        </FlexContainer>
      </OuterContainer>

      <InvestContainer>
            <Container style={{ width: '70%'  }} >
                <InvestH3>Become a Pioneer</InvestH3>
                <InvestP>Be one of the lucky Few To be one of TimeLine early investors. TimeLine Token Would be awarded overtime</InvestP>
                <Container style={{ marginTop: '2em' }} >
                    <Span>Your Wallet Address</Span> - <Span2>{account}</Span2>
                </Container>
            </Container>

            <Form onSubmit={submit} >
                <InvestInput placeholder='Name' type="text" value={name} onChange={(e)=> setName(e.target.value) } />
                <InvestButton type="submit" value="Save" />
            </Form>

        </InvestContainer>

    </OverallContainer>
  );
};

export default Body;

const OverallContainer = styled.div`
  width: 100%;
`;

const OuterContainer = styled(OverallContainer)`
  width: 80%;
  margin: auto;
`;

const Container = styled.div`
  width: 100%;
`;

const Form = styled.form`
    width: 70%;
    display: flex !important;
    flex-direction: row;
    justify-content: space-between;
`

const DetailDiv = styled(Container)`
  margin-top: 7em;
  text-align: center;
  letter-spacing: 1.5px;
`;

const FlexContainer = styled(Container)`
  display: flex;
  flex: row;
  justify-content: space-between;
  margin-top: 6em;
`;

const InnerFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 353.33px;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
`;

const H3 = styled.h2`
  font-size: 40px;
  color: #000b0a;
`;

const P = styled.p`
  font-size: 18px;
  margin-top: 1.3em;
  font-weight: 400;
  color: rgb(100 106 120);
`;

const P2 = styled(P)`
  font-size: 16px;
  align-self: center;
  text-align: center;
  margin-top: unset;
`;

const H5 = styled(H3)`
  font-size: 20px;
  margin: 0.6em;
  align-self: center;
  text-align: center;
`;

const InvestH3 = styled(H3)`
    font-size: 32px;
`

const InvestP = styled(P2)`
    font-size: 14px;
    line-height: 1.6;
    font-weight: normal;
    text-align: left;
    width: 60%;

`

const InvestInput = styled.input`
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 4px;
    padding: 20px;
    align-self: center;
    :focus{
        outline: none;
    }
    flex: .8;
`

const InvestButton = styled(InvestInput)`
    font-size: 16px;
    background: #6F159A;
    color: #ffffff;
    border-radius: 4px;
    flex: .2;
    margin-left: 1em;
`

const InvestContainer = styled(Container)`
    width: 80%;
    margin: auto;
    margin-top: 6em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2em 0;
`;

const Span = styled.span`
    color: #6F159A;
    font-size: 14px;
`

const Span2 = styled(Span)`
    color: #000b0a;
`

