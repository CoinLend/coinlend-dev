// SPDX-License-Identifier: MIT
pragma solidity >0.7.0;


contract Credit {

    enum State { investment, repayment, expired ,repaymentComplete }
    State public state = State.investment;

    // address payable public lender;
    address payable public borrower;
    uint public loanAmount;
    uint public interestRate;
    uint public loanEndTime;
    bool public isFraudulent;
    bool public active = false;
    //lenders of the contract
    mapping(address   => bool)  public lenders;

    mapping(address  => uint) public lendersInvestedAmount;


    constructor(uint256 _loanAmount ,uint _interestRate ,uint _loanDurationInDays ,address borrowerAddress ) {
        borrower = payable(borrowerAddress);
        //  require(msg.value >= _loanAmount, "Not enough ether sent to cover loan amount");
        // borrower = payable(_borrower);
        state = State.investment;
        loanAmount = _loanAmount;
        interestRate = _interestRate;
        loanEndTime = block.timestamp + (_loanDurationInDays * 1 days);
    }


    //invest in the contract
    function invest() public payable {
    
    require(msg.sender!=borrower);
    require(lenders[msg.sender]==false);
    lenders[msg.sender] = true;
    lendersInvestedAmount[msg.sender] = msg.value ;
        

    }


    function withdraw()  public {

        require(msg.sender == borrower);
        // require(isFraudulent == false);
        loanAmount = address(this).balance;
        state = State.repayment;
        borrower.transfer(address(this).balance);
    }

    function repay() external payable {

        require(borrower==msg.sender);
        require(state == State.repayment);
        require(msg.value >= loanAmount + ((loanAmount * interestRate) / 100), "Payment amount is incorrect");
        require(block.timestamp <= loanEndTime, "Loan has already expired");

        uint extra = 0;
        extra = msg.value - address(this).balance;
        borrower.transfer(extra);
        
        state = State.repaymentComplete;
        // lender.transfer(msg.value);

    }

    function getRefund() public{

        require(state==State.repaymentComplete);
        address payable lender = payable(msg.sender);
        require(lendersInvestedAmount[lender]>0);

        uint amount = lendersInvestedAmount[lender]+(lendersInvestedAmount[lender]*(interestRate/100));

        if(address(this).balance==0 ){
            state = State.expired;
        }
        lenders[lender] = false;
        lender.transfer(amount);
        lendersInvestedAmount[lender] = 0;
    }

    function getCreditDetails() public view returns(address _borrower ,uint _loanAmount ,uint _interest ,uint endTime ,State state){
        return(
            borrower,
            loanAmount,
            interestRate,
            loanEndTime,
            state
        );
    }

    function toggleActive() public {
        require(msg.sender==borrower);
        active=!active;
    }
    

    //testing functions
    function sendEther()public payable{

    }

}
