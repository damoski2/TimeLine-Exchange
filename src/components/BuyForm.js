import React, { useState } from 'react'
import styled from 'styled-components'
import tlDropDown from '../images/tlDropDown.svg'
import arrowUp from '../images/arrowUp.svg'
import daiLogo from '../images/dai.svg';
import tlSmall from '../images/tlSmall.svg';
import daiDD from '../images/daiDropDown.svg'


const BuyForm = ({ ethBalance, daiTokenBalance, timeLineBalance, buyTimeLine, currentForm, setCurrentForm}) => {
    //console.log(daiTokenBalance)

    const [output, setOutput] = useState('0')
    const [inputValue, setInputValue] = useState('');
    const [selectInp, setSelectInp] = useState('');

    const calcInp = (e)=>{
        const daiAmount = e.target.value
        setOutput(prev=> daiAmount*45);
        setInputValue(daiAmount);
    }

    const selectChange =(e)=>{
        setSelectInp(e.target.value)
    }

    const submit = (e)=>{
        e.preventDefault();
        let daiAmount;
        daiAmount = window.web3.utils.toWei(inputValue,'Ether');
        buyTimeLine(daiAmount)
        console.log('TimeLine Purchased')
    }

    const changeForm = ()=>{
        currentForm == 'buy'? setCurrentForm('sell') : setCurrentForm('buy')
    }

    return (
        <FormContainer onSubmit={submit} >
            <HeadingDiv>
                <p style={{ color: '#000000', fontSize: '20px', alignSelf: 'center', margin:'0', lineHeight: '24.2px'}} >Buy Currency</p>
                <HeadingButton onClick={changeForm} >Sell</HeadingButton>
            </HeadingDiv>
            <ExtendDiv>
                <InputBalance disabled value="Total Wallet Balance" style={{ fontSize: '14px', color: 'rgba(137, 137, 137, 1)' }} />
                <DD_Div>
                    <label htmlFor="balance_change" >
                        <img src={ selectInp == "tl"? tlDropDown : daiDD } />
                    </label>
                    <select style={{ position:'absolute', zIndex:'0', transform: 'translateX(-4em)', opacity:'0' }} id="balance_change" onChange={selectChange} >
                        <option value={`dai`} >Dai Coin</option>
                        <option value={`tl`} >timeLine</option>
                    </select>
                </DD_Div>
            </ExtendDiv>
            <Div>
                <ActualBalance disabled value={ selectInp == "tl"? window.web3.utils.fromWei(timeLineBalance,'Ether') : window.web3.utils.fromWei(ethBalance,'Ether')  } placeholder="6,300" style={{ fontSize: '48px', color:' #1C1D26', borderTop:'none', paddingTop:'0' }} />
            </Div>
            <Div style={{ marginTop: '2em' }} >
                <HeadingDiv>
                    <Label>Input amount</Label>
                    <RateDiv>
                        <img src={arrowUp} alt="" style={{ height:'fit-content', alignSelf: 'center' }} />
                        <P style={{ alignSelf: 'center' }} >0.76%</P>
                    </RateDiv>
                </HeadingDiv>
                <InputDiv>
                    <Input placeholder="0" onChange={calcInp} value={inputValue} />
                    <InputImg>
                        <img src={daiLogo} alt=""  style={{ display: 'block' }} />
                    </InputImg>
                </InputDiv>
            </Div>
            <Div style={{ marginTop: '2em' }} >
                <HeadingDiv>
                    <Label>Output amount</Label>
                    <RateDiv>
                        <img src={arrowUp} alt="" style={{ height:'fit-content', alignSelf: 'center' }} />
                        <P style={{ alignSelf: 'center' }} >1.53%</P>
                    </RateDiv>
                </HeadingDiv>
                <InputDiv>
                    <Input placeholder="0" disabled value={output} />
                    <InputImg>
                        <img src={tlSmall} alt=""  style={{ display: 'block' }} />
                    </InputImg>
                </InputDiv>
            </Div>
            <P style={{ marginTop: '1em',fontSize: '14px',color: 'rgba(137, 137, 137, 1)' }}> Gas fee: 0.0235 </P>
            <Div style={{ marginTop: '2em' }} >
                <EXdiv>
                    <P style={{ color: 'rgba(0, 20, 200, 1)', textAlign: 'center', fontSize: '14px', display: 'block', alignSelf: 'center' }} >
                    Exchange rate: 1 Dai = 45 TimeLine
                    </P>
                </EXdiv>
            </Div>
            <Div style={{ marginTop: '2em' }}  >
                <SubmitBtn type="submit" >Exchange</SubmitBtn>
            </Div>
        </FormContainer>
    )
}

export default BuyForm


const FormContainer = styled.form`
    background: #F9F9F9;
    width: 416px;
    padding: 24px;
    height: fit-content;
    border-radius: 4px;

    @media(max-width: 1024px){
        margin-top: 2em;
        width: 100%;
    }
`

const Div = styled.div`

`

const HeadingDiv = styled(Div)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const HeadingButton = styled.span`
    width: 100px;
    color: #4655E1;
    padding: 8px 12px;
    background: #EEF0FF;
    height: 40px;
    border: none;
    border-radius: 999px;
    text-align: center;
    cursor: pointer;
`

const ExtendDiv = styled(HeadingDiv)`
    margin-top: 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const InputBalance = styled.input`
    background: #ffffff;
    border: 1px solid rgba(245, 245, 245, 1);
    border-right: none;
    width: 100%;
    padding: 24px 24px 8px 24px;
    border-bottom: none;
    flex: 0.8;
`

const ActualBalance = styled(InputBalance)`
    padding: 0 24px 24px 24px;
    font-size: 48px;
    color: #1C1D26;
`

const DD_Div = styled.div`
    background: #ffffff;
    border: 1px solid rgba(245, 245, 245, 1);
    width: 100%;
    padding: 24px 24px 8px 24px;
    border-left: none;
    border-bottom: none;
    flex: 0.2;
`

const Select = styled.select`

`

const P = styled.p`
    margin: 0;
`

const Label = styled.label`
    font: 14px;
    line-height: 16.66px;
    align-self: center;
    margin-bottom: 0;
    color: #898989;
`

const RateDiv = styled(HeadingDiv)`
    background: #F5FFF8;
    min-width: 80px;
    padding: 8px;
    color: #0A9952;
    font-size: 12px;
`

const InputDiv = styled(Div)`
    display: flex;
    flex-direction: row;
    margin-top: 1em;
`

const Input = styled.input`
    height: 40px;
    background-color: #fff;
    width: 100%;
    border: none;
    padding: 0 20px;

    :focus{
        outline: none;
    }

`
const InputImg = styled(Div)`
    padding: 10px 24px;
    height: 40px;
    background: #ffffff;
    display: block;
    border-left: 1px solid rgba(245, 245, 245, 1);
`

const EXdiv = styled(Div)`
    width: 100%;
    background: #EEF0FF;
    border-radius: 2px;
    height: 48px;
    display: flex;
    justify-content: center;
`

const SubmitBtn = styled.button`
    background: #4655E1;
    height: 48px;
    color: #ffffff;
    width: 100%;
    border-radius: 2px;
    border: none;
    font-size: 14px;

`

