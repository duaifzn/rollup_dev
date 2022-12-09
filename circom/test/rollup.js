import * as circomlibjs from "circomlibjs";
import * as snarkjs from "snarkjs";
import fs from "fs";

(async () =>{
    let mimc7 = await circomlibjs.buildMimc7();
    let v = [];
    for(let i=0; i<50; i++){
        let a = mimc7.hash(i, i+1);
        v.push(mimc7.F.toString(a));
    }
    fs.writeFileSync("a.json", JSON.stringify(v));
    

})()