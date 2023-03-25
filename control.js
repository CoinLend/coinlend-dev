const {ethers} = require('ethers')
const fs = require('fs');
const provider = new ethers.JsonRpcProvider(`HTTP://127.0.0.1:7545`);

const MainContractAddress = "0x2A23746Ac0726fb8eF9CC76e50A4510F1E2Eebaf";

// Read the JSON file
const rawdata = fs.readFileSync('./build/contracts/Main.json');
const Mainjson = JSON.parse(rawdata);

// Extract the ABI field
const Main_abi = Mainjson.abi;


const connectToweb3 = async()=>{

}
