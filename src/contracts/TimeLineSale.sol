pragma solidity ^0.5.0;

import "./TimeLine.sol";

contract TimeLineSale{

    TimeLine public timeline;
    address payable admin;
    uint public rate = 45;
    uint public tokensSold;

    event Sell(
        address _buyer,
        uint _amount,
        uint _rate
    );

    modifier onlyOwner(){
        require(msg.sender == admin);
        _;
    }


    constructor(TimeLine _timeline) public{
        timeline = _timeline;
        admin = msg.sender;
    }

    function buyTokens() public payable{
        uint timeLineAmount = msg.value * rate;
        require(timeline.balanceOf(address(this)) >= timeLineAmount);
        timeline.transfer(msg.sender, timeLineAmount);
        emit Sell(msg.sender, timeLineAmount, rate);
    }


    //End Sale
    function endSale() public onlyOwner{
        require(timeline.transfer(admin,timeline.balanceOf(address(this))));
        selfdestruct(admin);
    }
}