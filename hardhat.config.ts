import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config.js";
import "hardhat-gas-reporter";
import "solidity-coverage";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: "http://alchemy.com",
      accounts: [
        "0x1234567890123456789012345678901234567890123456789012345678901234",
      ],
      chainId: 1337,
    },
    localhost: {
      url: process.env.LOCALHOST_URL,
      accounts: [process.env.LOCALHOST_PRIVATE_KEY!],
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: "YOUR_ETHERSCAN_API_KEY",
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    // currency: "USD",
  },
};

export default config;
