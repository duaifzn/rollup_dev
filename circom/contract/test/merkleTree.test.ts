import Web3 from 'web3';
import { readFileSync } from "fs";
import path from "path";
const circomlibjs = require("circomlibjs");
let contract = circomlibjs.poseidonContract;

(async () => {
    const web3 = new Web3('http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log("balance: ", balance);
    const nonce = await web3.eth.getTransactionCount(accounts[0]);
    console.log(nonce);
    let merkleTreeABI = JSON.parse(readFileSync(path.resolve(__dirname, "../abi/merkleTree.json"), { encoding: "utf8" }));
    let merkleTree = new web3.eth.Contract(merkleTreeABI, "0x130a4AC8f4c0E2f472db0F26d4A020518E6f285F");

    let data = await merkleTree.methods.getRoot().call();
    console.log(data);
    // let txTemp = {
    //     to: "0x130a4AC8f4c0E2f472db0F26d4A020518E6f285F",
    //     from: accounts[0],
    //     nonce: nonce,
    //     data: data,
    //     gas: 3000000,
    //     gasPrice: 10000000000,
    // };
    // const signed = await web3.eth.accounts.signTransaction(txTemp, "0xc28c1140746bfd841c1994e4bba7bfc77cf6048263e5a8a00922ae9819b82798");
    // if (!signed.rawTransaction){
    //     throw Error("rawTransaction null!")
    // }
    // console.log(signed);
    // let temp = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    // console.log(temp);
})()
