// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <=0.9.0;

import { Verifier } from "./verifier.sol";

contract Verify is Verifier{
    address public owner;
    uint256 public root;
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner.");
        _;
    }
    function updateRoot(uint256 newRoot) public onlyOwner returns(uint256){
        root = newRoot;
        return(root);
    }
    function verifyProofWithRoot(uint[2] memory a, uint[2][2] memory b, uint[2] memory c) public returns(bool){
        bool proof = verifyProof(a, b, c, [root]);
        return (proof);
    }
}