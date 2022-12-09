import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: `http://localhost:8545`,
      accounts: ["0xc28c1140746bfd841c1994e4bba7bfc77cf6048263e5a8a00922ae9819b82798"]
    }
  }
};

export default config;
