include "../circomlib/circuits/mimc.circom";
include "../circomlib/circuits/mimcsponge.circom";
include "../circomlib/circuits/eddsamimcsponge.circom";
include "../circomlib/circuits/poseidon.circom";
include "../circomlib/circuits/bitify.circom";

template Hash2(){
    signal input a;
    signal input b;
    signal output out;
    component h = Poseidon(2);
    h.inputs[0] <== a;
    h.inputs[1] <== b;
    out <== h.out;
}

template Hash4(){
    signal input a;
    signal input b;
    signal input c;
    signal input d;
    signal output out;
    component h = Poseidon(4);
    h.inputs[0] <== a;
    h.inputs[1] <== b;
    h.inputs[2] <== c;
    h.inputs[3] <== d;
    out <== h.out;
}

template GetMerkleRoot(k){ 
    signal input leaf;
    signal input merkle_proof_value[k];
    signal input merkle_proof_position[k];
    signal output out;

    component merkle_root[k];
    merkle_root[0] = Hash2();
    merkle_root[0].a <== merkle_proof_value[0] - merkle_proof_position[0] * (merkle_proof_value[0] - leaf);
    merkle_root[0].b <== leaf - merkle_proof_position[0] * (leaf - merkle_proof_value[0]);

    for (var v = 1; v < k; v++){
        merkle_root[v] = Hash2();
        merkle_root[v].a <== merkle_proof_value[v] -  merkle_proof_position[v] * (merkle_proof_value[v] - merkle_root[v-1].out);
        merkle_root[v].b <== merkle_root[v-1].out - merkle_proof_position[v] * (merkle_root[v-1].out - merkle_proof_value[v]);
    }

    out <== merkle_root[k-1].out;

}

template Rollup(k){
    signal input root;
    signal input leaf_input[4];
    signal input proof_value[k];
    signal input proof_position[k];

    // signal input block_root;
    // signal input block_paths2_root[8]; // merkle path
    // signal input block_paths2_root_pos[8]; // merkle path index

    signal output correct_root;

    component leaf = Hash4();
    leaf.a <== leaf_input[0];
    leaf.b <== leaf_input[1];
    leaf.c <== leaf_input[2];
    leaf.d <== leaf_input[3];

    component computed_root = GetMerkleRoot(k);
    computed_root.leaf <== leaf.out;
    
    for(var i=0; i<k; i++){
        computed_root.merkle_proof_value[i] <== proof_value[i];
        computed_root.merkle_proof_position[i] <== proof_position[i];
    }

    log(computed_root.out);
    root === computed_root.out;
    correct_root <== computed_root.out;
    // // root constrain
	// component block_leaf = MiMC7(91);
	// block_leaf.x_in <== secret;
	// block_leaf.k <== 0;

    // component computed_block_root = GetMerkleRoot(8);
    // computed_block_root.leaf <== block_leaf.out;

    // for (var w = 0; w < 8; w++){
    //     computed_block_root.paths2_root[w] <== block_paths2_root[w];
    //     computed_block_root.paths2_root_pos[w] <== block_paths2_root_pos[w];
    // }

    // block_root === computed_block_root.out;

    // // root constrain
	// component leaf = MiMC7(91);
	// leaf.x_in <== computed_block_root.out;
	// leaf.k <== 0;

    // component computed_root = GetMerkleRoot(k);
    // computed_root.leaf <== leaf.out;

    // for (var w = 0; w < k; w++){
    //     computed_root.paths2_root[w] <== paths2_root[w];
    //     computed_root.paths2_root_pos[w] <== paths2_root_pos[w];
    // }

    // log(computed_root.out);
    // root === computed_root.out;

    // correct_root <== computed_root.out;
}

component main = Rollup(20);