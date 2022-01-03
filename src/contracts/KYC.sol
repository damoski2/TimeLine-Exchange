pragma solidity ^0.5.0;



import "./TimeLine.sol";


contract KYC{
    struct Investors {
        string name;
        bool added; 
        address payable wallet;
        uint balance;
    }

    event Invest(
        string name,
        address wallet
    );

    TimeLine public timeLine;
    mapping(uint => Investors) public pioneers;
    uint public customerCount;
    address admin;
    uint256 public maxPioneers = 100;
    uint256 public pioneersAmount;
    mapping(address => bool) public stakers;

    constructor(TimeLine _timeLine) public{
        admin = msg.sender;
        timeLine = _timeLine;
    }

     modifier notOwner(){
        require(msg.sender != admin);
        _;
    }

     modifier onlyOwner(){
        require(msg.sender == admin);
        _;
    }

     function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    function incrementPioneersCnt() internal{
        customerCount += 1;
    }

    function compareStringsbyBytes(string memory s1, string memory s2) public pure returns(bool){
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }

    function invest(string memory _name) public notOwner{
        require(!stakers[msg.sender],"Pioneer already added");
        require(customerCount <= maxPioneers, "Maximum number of Pioneers added");
        
        pioneers[customerCount+1].name = _name;
        pioneers[customerCount+1].added = true;
        pioneers[customerCount+1].wallet = msg.sender;
        pioneers[customerCount+1].balance = 0;

        stakers[msg.sender] = true;
        incrementPioneersCnt();
        emit Invest(_name,msg.sender);
    }

    function rewardPioneers() public onlyOwner{
        pioneersAmount = div(timeLine.balanceOf(address(this)) , maxPioneers);
        for(uint i=1; i<customerCount+1; i++){
            address addr = pioneers[i].wallet;
            if(pioneers[i].balance <= 0){
                timeLine.transfer(addr , pioneersAmount);
                pioneers[i].balance = pioneersAmount;
            }
        }
    }

    function returnPioneer(string memory _name) public view returns(bool){
        for(uint i=1; i<customerCount+1; i++){
            if(compareStringsbyBytes(_name,pioneers[i].name)){
                return true;
            }
        }
    }
    
}