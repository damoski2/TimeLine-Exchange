pragma solidity ^0.5.0;

import "./TimeLine.sol";

contract DaiToken {
    string  public name = "Mock DAI Token";
    string  public symbol = "mDAI";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;
    uint public rate = 45;
    TimeLine public timeLine;
    address public owner;


    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokenSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(TimeLine _timeLine) public {
        owner = msg.sender;
        timeLine = _timeLine;
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function buytimeline() public payable {
        uint timeLineAmount = msg.value * rate;

        require(timeLine.balanceOf(address(this)) >= timeLineAmount);

        //Transfer tokens to user
        timeLine.transfer(msg.sender , timeLineAmount);

        //emit TokenPurchased(msg.sender, address(timeLine), timeLineAmount, rate);
    }


    function selltimeline(uint _amount) public{
        //User cant sell more timeLine than they have;
        require(timeLine.balanceOf(msg.sender) >= _amount);

        uint timeLineAmount = _amount/rate;

        //Require DaiToken SC has enough daitoken for the transaction
        require(address(this).balance >= timeLineAmount);


        //Perform sale
        timeLine.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(timeLineAmount);

        //emit TokenSold(msg.sender, address(this), timeLineAmount, rate);
    }
}