# CoinLend
Peer-to-peer Money lending platform on the Ethereum blockchain network.

# About
Coin Lend is a blockchain-based platform that connects borrowers with lenders directly without intermediaries. It enables lenders to offer loans with varying interest rates while borrowers can choose the loan that suits them. The platform uses smart contracts to automate loan origination, repayment, and tracking, reducing the risk of fraud and default. The platform also has a reputation system to assess creditworthiness. Coin Lend offers lower fees, faster loan processing times, and greater access to funding. It also has a mobile application for users to manage their loans. Overall, Coin Lend aims to revolutionize the lending and borrowing industry by providing a decentralized, secure, and transparent platform.

# Features

  - Ask for funding (borrow)
  - Provide details of the requested funding.
  - Withdrawal of funding after successfully reached goal of full funding.
  - Repayment installments functionallity.
  - Invest in project/credit (Working)
  - Vote for revoke contract / refund investments.(Working)
  - Mark project as Fraud.(Working)
  
## Chart flow

![Chart flow](https://i.ibb.co/nPjVxLF/Chart-Flow.jpg)

### Further development

  - Improve external contract calls.
  - Minimize gas cost.
  - Create more investors protection.

### Requirements
* [Node.js](https://nodejs.org/)
* [Truffle](https://truffleframework.com/)
* [Ganache](https://truffleframework.com/ganache/)
* [MetaMask](https://metamask.io/)
    
## Installation
Clone the repository
```bash
git clone https://github.com/CoinLend/coinlend-dev.git
```

## Usage

1. Start the Ganache ``localhost:7575 ``

2. Change the directory
```sh
$ cd coinlend-dev
$ truffle complie
$ truffle migrate --reset --network development --verbose-rpc
```
3. Set the ``PeerToPeerLending`` contract newly published address in the [client/public/js/contract_interaction.js LINE:3](https://github.com/CoinLend/coinlend-dev) 

4. Install the dependencies and devDependencies and start the server.

```sh
$ cd p2p-lending/client
$ npm install --save
$ npm start
```

5. Your app is running on ``http://localhost:3000``
### Development

Want to contribute? Great!

# Authors

    Chaitnya Giri - chaitnyagiri2306@gmail.com
    Harshal Dube - harshaldube181@gmail.com
    Brij Vaghani - vaghanibrij222@gmail.com
    Golla Anjaiah - gollaanjimath123@gmail.com
    

# License

[MIT](https://choosealicense.com/licenses/mit/)
