import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "dotenv/config";

const polyscanKey = process.env.POLYSCAN_KEY!;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.20" }, { version: "0.8.19" }],
  },
  etherscan: {
    apiKey: {
      polygonMumbai: polyscanKey,
    },
  },
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      chainId: 80001,
      accounts: process.env.DEPLOYMENT_PRIVATE_KEY
        ? [process.env.DEPLOYMENT_PRIVATE_KEY]
        : [],
      gasPrice: 100_000_000_000,
    },
  },
};

export default config;
