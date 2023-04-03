// SPDX-License-Identifier: MIT
pragma solidity >0.7.0;
import './Credit.sol';


contract Main{

    address public owner;
      // User structure
    struct User {
        // Is the user currently credited.
        bool credited;

        // The adress of the active credit.
        Credit activeCredit;

        // Is the user marked as fraudlent.
        bool fraudStatus;

        uint creditScore;

        // All user credits.
        Credit[] allCredits;

        address[] investedCredits;
    }

    // We store all users in a mapping.
    mapping(address => User) public users;
    address[] array;
    Credit[] public credits;

    constructor(){
        owner = msg.sender;
        array.push(msg.sender);
    }

     function applyForCredit(uint requestedAmount, uint interest, uint endDays ) public  returns(Credit _credit) {
        // The user should not have been credited;
        require(users[msg.sender].credited == false);
 
         require(users[msg.sender].fraudStatus == false);

        users[msg.sender].credited = true;

        Credit credit = new Credit(requestedAmount, interest , endDays ,msg.sender);

        users[msg.sender].activeCredit = credit;

        credits.push(credit);

        // Add the credit to the user's profile.
        users[msg.sender].allCredits.push(credit);

        return credit;
    }

    function getUserCredits() public view returns (Credit[] memory) {
        return users[msg.sender].allCredits;
    }

     function setFraudStatus(address _borrower) external returns (bool) {
        // Update user fraud status.
        users[_borrower].fraudStatus = true;

        // Log fraud status.
        // LogUserSetFraud(_borrower, users[_borrower].fraudStatus, block.timestamp);

        return users[_borrower].fraudStatus;
    }

    function getCredits() public view returns(Credit []memory){
        return credits;
    }

    function updateCreditScore(uint points ,address borrower) external{

        users[borrower].creditScore = users[borrower].creditScore + points;
    }

    function getScore(address borrower)public view returns(uint){

        return users[borrower].creditScore;
    }

    function addToInvestedCredits(address lender ,address credit) public{ 

        users[lender].investedCredits.push(credit);
    }
    function getInvestedCredits() public view returns(address []memory){

        return users[msg.sender].investedCredits;
    }
     

}


