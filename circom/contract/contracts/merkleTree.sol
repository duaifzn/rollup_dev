// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <=0.9.0;

import { IPoseidonT5, IPoseidonT3 } from "./poseidon.sol";

contract Merkletree{
    uint public depth = 20;
    uint public leaves = 1048576;
    struct Mtree{
        uint256 current;
        uint256[1048576][21] leaves;
    }

    Mtree public MT;
    IPoseidonT5 hash4;
    IPoseidonT3 hash2;

    event PoseidonHashValue(uint256);
    event LeafAdded(uint256);
    event MerkleProof(uint256[20], uint256[20]);

    constructor(address _poseidonT5Address, address _poseidonT3Address) public{
        hash4 = IPoseidonT5(_poseidonT5Address);
        hash2 = IPoseidonT3(_poseidonT3Address);
    }

    function getTxHash(uint256[4] memory input) public returns (uint256){
        emit PoseidonHashValue(hash4.poseidon(input));
        return hash4.poseidon(input);
    }

    function insert(uint256[4] memory input) public returns (uint256){
        uint256 leaf = getTxHash(input); 
        require(MT.current < leaves, "leaves full");
        MT.leaves[0][MT.current] = leaf;
        update();
        emit LeafAdded(MT.current);
        MT.current++;
        return MT.current-1;
    }

    function update() public returns(uint256 root){
        uint256 currentIndex = MT.current;
        uint256 leaf1;
        uint256 leaf2;
        for(uint256 i=0; i<depth; i++){
            uint256 nextIndex = currentIndex/2;
            if (currentIndex%2 == 0) {
                leaf1 = MT.leaves[i][currentIndex];
                leaf2 = MT.leaves[i][currentIndex + 1];
            } else {
                leaf1 = MT.leaves[i][currentIndex - 1];
                leaf2 = MT.leaves[i][currentIndex];
            }
            MT.leaves[i+1][nextIndex] = hash2.poseidon([leaf1, leaf2]);
            currentIndex = nextIndex;
        }
        return MT.leaves[depth][0];
    }

    function getMerkleProof(uint256 index) public returns(uint256[20] memory, uint256[20] memory){
        uint256[20] memory leafValue;
        uint256[20] memory position;
        for (uint256 i=0 ; i < depth; i++) {
            if (index%2 == 0) {
                position[i] = 1;
                leafValue[i] = MT.leaves[i][index + 1];
            }
            else {
                position[i] = 0;
                leafValue[i] = MT.leaves[i][index - 1];
            }
            index = uint256(index/2);
        }
        emit MerkleProof(leafValue, position);
        return(leafValue, position);  
    }

    function getLeaf(uint256 i, uint256 j) public view returns(uint256 leaf){
        return(MT.leaves[i][j]);
    }

    function getRoot() public view returns(uint256){
        return(MT.leaves[depth][0]);
    }

    function getCurrentIndex() public view returns(uint256){
        return(MT.current);
    }

}