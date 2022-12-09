import Web3 from "web3";

class EthNode{
    url: string;
    web3: Web3;
    constructor(url: string){
        this.url = url;
        this.web3 = new Web3(url);
    }

}

export { EthNode };