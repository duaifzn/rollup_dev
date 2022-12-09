"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const web3_1 = __importDefault(require("web3"));
const fs_1 = require("fs");
(async () => {
    const web3 = new web3_1.default('http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log("balance: ", balance);
    const nonce = await web3.eth.getTransactionCount(accounts[0]);
    console.log(nonce);
    let verifyABI = JSON.parse((0, fs_1.readFileSync)(path_1.default.resolve(__dirname, "../abi/verify.json"), { encoding: "utf8" }));
    let verify = new web3.eth.Contract(verifyABI, "0xa050307c78075891b5dD08b5fC73ECE97Ec7593a");
    let data = verify.methods.updateRoot("14462460033934579395310729188138303439718878852224895915626784917917019204542").call();
    console.log(data);
})();
