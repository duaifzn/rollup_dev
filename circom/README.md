compile
circom ./circuit/rollup.circom --r1cs --wasm --sym --c

run and genarate witness.wtns
node ./rollup_js/generate_witness.js ./rollup_js/rollup.wasm input.json witness.wtns

zkey
snarkjs groth16 setup rollup.r1cs pot20_final.ptau rollup_0000.zkey

zkey
snarkjs zkey contribute rollup_0000.zkey rollup_0001.zkey --name="1st Contributor Name" -v

verification_key
snarkjs zkey export verificationkey rollup_0001.zkey verification_key.json

proof.json public.json
snarkjs groth16 prove rollup_0001.zkey witness.wtns proof.json public.json

verify
snarkjs groth16 verify verification_key.json public.json proof.json

contract
snarkjs zkey export solidityverifier rollup_0001.zkey verifier.sol

