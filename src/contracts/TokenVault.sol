pragma solidity ^0.5.0;


import "./DaiToken.sol";
import "./TimeLine.sol";

contract TokenVault{

    string public name = "Token Vault";
    TimeLine public timeLine;
    DaiToken public daiToken;
    address public owner;
    //uint public gasPrice = 0.34;


    address[] public stakers;
    mapping(address=>uint) public stakingBalance;
    mapping(address=>bool) public hasStaked;
    mapping(address=>bool) public isStaking;

    constructor(TimeLine _timeLine, DaiToken _daiToken) public {
        timeLine = _timeLine;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function stakeTimeLine(uint _amount) public{
        //Require amount greater tham "0"
        require(_amount > 0,"amount cannot be 0");

        //Transfer Dai Token to tokenVault for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);


        //Update Staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //Add Investor to staker array if they havent staked already
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //Issueing tokens
    function issueTimeLine() public onlyOwner{
        //require(msg.sender == owner, "caller must be owner/deployer of the Vault");
        //Issue TimeLine to all stakers
        for(uint i=0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0){
                //balance = balance * (uint(34)/uint(100));
                timeLine.transfer(recipient,balance);
            }
        }
    }

    //UnStaking tokens
    function unStakeTimeLine() public{
        //fetch staking balance
        uint balance = stakingBalance[msg.sender];

        //Require amount greater than 0
        require(balance > 0,"staking balance cannot be 0");

        //Transfer TimeLine to vault for staking
        daiToken.transfer(msg.sender,balance);

        //Reset staking balance
        stakingBalance[msg.sender] = 0;

        //update staking status
        isStaking[msg.sender] = false;
        
    }

}