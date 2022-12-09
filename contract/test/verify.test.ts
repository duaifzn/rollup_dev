import path from "path";
import Web3 from 'web3';
import { readFileSync } from "fs";

(async () =>{
    const web3 = new Web3('http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log("balance: ", balance);
    const nonce = await web3.eth.getTransactionCount(accounts[0]);
    console.log(nonce);
    let verifyABI = JSON.parse(readFileSync(path.resolve(__dirname, "../abi/verify.json"), { encoding: "utf8" }));
    let verify = new web3.eth.Contract(verifyABI, "0xa050307c78075891b5dD08b5fC73ECE97Ec7593a");
    let data = await verify.methods.verifyProofWithRoot(
        ["0x25510827f6fed3e05a398a3fed10b6ab8cc1b8214a40cda9e386df13ee7fe81c", "0x26be8c4278b5afe0abb6ccc723df117ed3b8a6b942b20e0e5d5cae95c122b6dd"],
        [["0x261095cfbfd809e7f2299388cf48ed30819db083b112e79ff45878e0c93e0b0c", "0x1048f0d431dc76d9fcd4e8a064642a90ba2d94d02b33b34a24eb935d98578b27"],["0x1378427118451b1a10e42cb8d9eeac467b0978d912004776d04038a4a9c8acc5", "0x2fc5e34d9ad3bed84dc100686dbfa32c2788e660db216a75ad7bbc50a28ce8ed"]],
        ["0x29b2f0c8f957aabfb95f48f07c80b1872444b1ed1c3581003c3eaedd1626690f", "0x109bdc7e1bc425048d5fb7cc65855654f40057dd9eb5d581f1ba84556d37b687"]
       ).call();
    console.log(data);
    // let txTemp = {
    //     to: "0xa050307c78075891b5dD08b5fC73ECE97Ec7593a",
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