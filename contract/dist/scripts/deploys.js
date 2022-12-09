"use strict";
const { ethers } = require("hardhat");
const circomlibjs = require("circomlibjs");
let contract = circomlibjs.poseidonContract;
let poseidonT5 = contract.createCode(4);
let poseidonT5ABI = contract.generateABI(4);
let poseidonT3 = contract.createCode(2);
let poseidonT3ABI = contract.generateABI(2);
(async () => {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    // let PoseidonT5 = await ethers.getContractFactory(poseidonT5ABI as any[], poseidonT5);
    // let PoseidonT3 = await ethers.getContractFactory(poseidonT3ABI as any[], poseidonT3);
    // let poseidonT5Deploy = await PoseidonT5.deploy();
    // console.log("PoseidonT5 address: ", poseidonT5Deploy.address);
    // let poseidonT3Deploy = await PoseidonT3.deploy();
    // console.log("PoseidonT3 address: ", poseidonT3Deploy.address);
    // //0x082683a83a223Ab96475AA4E91D6b1Ff7223Ae3c
    // //0xe6d54F9661aEEFBE883eF173364B813aF0F8E857
    // let MerkleTree = await ethers.getContractFactory("Merkletree");
    // let merkleTree = await MerkleTree.deploy(poseidonT5Deploy.address, poseidonT3Deploy.address);
    // console.log("merkleTree address: ", merkleTree.address);
    // console.log("merkleTree: ", merkleTree)
    // PoseidonT5 address:  0x79CF3ED7E0f28545Ec30E0991f5588F6A5eFBc82
    // PoseidonT3 address:  0xa75079EDA5aDe227F5c1bFaDf1DbEccb6c979e17
    // merkleTree address:  0x8d54eb3D44FDeC15b4997d8a3F48bef373485646
    const Verify = await ethers.getContractFactory("Verify");
    const verify = await Verify.deploy();
    console.log("verify address:", verify.address);
})();
