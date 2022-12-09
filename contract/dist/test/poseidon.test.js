"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const circomlibjs = require("circomlibjs");
let contract = circomlibjs.poseidonContract;
let poseidonT5 = contract.createCode(4);
let poseidonT5ABI = contract.generateABI(4);
let poseidonT3 = contract.createCode(2);
let poseidonT3ABI = contract.generateABI(2);
(async () => {
    const web3 = new web3_1.default('http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log("balance: ", balance);
    const nonce = await web3.eth.getTransactionCount(accounts[0]);
    console.log(nonce);
    let merkleTreeABI = JSON.parse((0, fs_1.readFileSync)(path_1.default.resolve(__dirname, "../abi/merkleTree.json"), { encoding: "utf8" }));
    let merkleTree = new web3.eth.Contract(merkleTreeABI, "0x130a4AC8f4c0E2f472db0F26d4A020518E6f285F");
    // let d = await merkleTree.methods.getLeaf(0,0).call();
    // console.log(d);
    // let hash4 = new web3.eth.Contract(poseidonT5ABI , "0x082683a83a223Ab96475AA4E91D6b1Ff7223Ae3c");
    // let data = await hash4.methods.poseidon(['1234', '123', '12345', '123456']).call();
    // console.log(data);
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
})();
