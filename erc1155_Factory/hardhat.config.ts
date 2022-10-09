import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { privateKeys } from "./utils/wallets";
import * as dotenv from 'dotenv'
dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: { optimizer: { enabled: true, runs: 200 } },
      }
    ]
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      accounts: getHardhatPrivateKeys(),
      gas: 12000000,
      blockGasLimit: 12000000
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      timeout: 200000,
      gas: 12000000,
      blockGasLimit: 12000000
    },
    matic: {
      url: "https://polygon-rpc.com",
      // @ts-ignore
      accounts: [`0x${process.env.MATIC_DEPLOY_PRIVATE_KEY}`],
      gas: 12000000,
      blockGasLimit: 12000000
    },
  },
  // @ts-ignore
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
    externalArtifacts: ["external/**/*.json"],
  },
  // @ts-ignore
  contractSizer: {
    runOnCompile: false,
  },
}

function getHardhatPrivateKeys() {
  return privateKeys.map(key => {
    const ONE_MILLION_ETH = "1000000000000000000000000";
    return {
      privateKey: key,
      balance: ONE_MILLION_ETH,
    };
  });
}

export default config;
