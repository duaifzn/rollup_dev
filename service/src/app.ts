import { CronJob } from "cron";
import Web3 from "web3";

const privateWeb3 = new Web3("http://localhost:8545");
const publicWeb3 = new Web3("http://localhost:8545");

const job = new CronJob('0 */2 * * * *',
function() {
    
});
job.start();