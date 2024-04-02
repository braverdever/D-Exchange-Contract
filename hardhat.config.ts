import dotenv from "dotenv";
dotenv.config();

import path from "path";
import fs from "fs";
import { ethers } from "ethers";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-deploy";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";

// extends hre with gmx domain data
import "./config";

// add test helper methods
import "./utils/test";
import { formatUnits, parseUnits } from "ethers/lib/utils";

const getRpcUrl = (network) => {
  const defaultRpcs = {
    xodex: "https://xo-dex.io",
    bytex: "https://test-rpc.bytexc.org",
    arbitrum: "https://arb1.arbitrum.io/rpc",
    avalanche: "https://api.avax.network/ext/bc/C/rpc",
    arbitrumGoerli: "https://goerli-rollup.arbitrum.io/rpc",
    avalancheFuji: "https://api.avax-test.network/ext/bc/C/rpc",
    wannsee: "https://wannsee-rpc.mxc.com",
  };

  let rpc = defaultRpcs[network];

  const filepath = path.join("./.rpcs.json");
  if (fs.existsSync(filepath)) {
    const data = JSON.parse(fs.readFileSync(filepath).toString());
    if (data[network]) {
      rpc = data[network];
    }
  }

  return rpc;
};

const getEnvAccounts = () => {
  const { ACCOUNT_KEY, ACCOUNT_KEY_FILE } = process.env;

  if (ACCOUNT_KEY) {
    return [ACCOUNT_KEY];
  }

  // if (ACCOUNT_KEY_FILE) {
  //   const filepath = path.join("./keys/", ACCOUNT_KEY_FILE);
  //   const data = JSON.parse(fs.readFileSync(filepath));
  //   if (!data) {
  //     throw new Error("Invalid key file");
  //   }

  //   if (data.key) {
  //     return [data.key];
  //   }

  //   if (!data.mnemonic) {
  //     throw new Error("Invalid mnemonic");
  //   }

  //   const wallet = ethers.Wallet.fromMnemonic(data.mnemonic);
  //   return [wallet.privateKey];
  // }

  return [];
};

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10,
        details: {
          constantOptimizer: true,
        },
      },
    },
  },
  networks: {
    // hardhat: {
    //   saveDeployments: true,
    //   // forking: {
    //   //   url: `https://rpc.ankr.com/avalanche`,
    //   //   blockNumber: 33963320,
    //   // },
    // },
    // localhost: {
    //   saveDeployments: true,
    // },
    arbitrum: {
      url: getRpcUrl("arbitrum"),
      chainId: 42161,
      accounts: getEnvAccounts(),
      verify: {
        etherscan: {
          apiUrl: "https://api.arbiscan.io/",
          apiKey: process.env.ARBISCAN_API_KEY,
        },
      },
      blockGasLimit: 20_000_000,
    },
    // avalanche: {
    //   url: getRpcUrl("avalanche"),
    //   chainId: 43114,
    //   accounts: getEnvAccounts(),
    //   verify: {
    //     etherscan: {
    //       apiUrl: "https://api.snowtrace.io/",
    //       apiKey: process.env.SNOWTRACE_API_KEY,
    //     },
    //   },
    //   blockGasLimit: 15_000_000,
    // },
    // arbitrumGoerli: {
    //   url: getRpcUrl("arbitrumGoerli"),
    //   chainId: 421613,
    //   accounts: getEnvAccounts(),
    //   verify: {
    //     etherscan: {
    //       apiUrl: "https://api-goerli.arbiscan.io/",
    //       apiKey: process.env.ARBISCAN_API_KEY,
    //     },
    //   },
    //   blockGasLimit: 10000000,
    // },
    // avalancheFuji: {
    //   url: getRpcUrl("avalancheFuji"),
    //   chainId: 43113,
    //   accounts: getEnvAccounts(),
    //   verify: {
    //     etherscan: {
    //       apiUrl: "https://api-testnet.snowtrace.io/",
    //       apiKey: process.env.SNOWTRACE_API_KEY,
    //     },
    //   },
    //   blockGasLimit: 2500000,
    //   // gasPrice: 50000000000,
    // },
    wannsee: {
      url: getRpcUrl("wannsee"),
      chainId: 5167003,
      accounts: getEnvAccounts(),
      // gasPrice: parseUnits("8000000", "gwei").toNumber(),
      verify: {
        etherscan: {
          apiUrl: "https://wannsee-explorer-v1.mxc.com/",
          apiKey: "",
        },
      },
      // blockGasLimit: 2_000_000_000,
    },
    bytex: {
      url: getRpcUrl("bytex"),
      chainId: 1919,
      accounts: getEnvAccounts(),
      // gasPrice: parseUnits("800", "gwei").toNumber(),
      verify: {
        etherscan: {
          apiUrl: "https://test.bytescan.io/",
          apiKey: "",
        },
      },
      // blockGasLimit: 2500,
    },
    xodex: {
      url: getRpcUrl("xodex"),
      chainId: 2415,
      accounts: getEnvAccounts(),
      // gasPrice: parseUnits("100", "gwei").toNumber(),
      // verify: {
      //   etherscan: {
      //     apiUrl: "https://test.bytescan.io/",
      //     apiKey: "",
      //   },
      // },
      // blockGasLimit: 2500,
    },
  },
  // hardhat-deploy has issues with some contracts
  // https://github.com/wighawag/hardhat-deploy/issues/264
  etherscan: {
    apiKey: {
      // hardhat-etherscan plugin uses "avalancheFujiTestnet" name
      arbitrumOne: process.env.ARBISCAN_API_KEY,
      // avalanche: process.env.SNOWTRACE_API_KEY,
      // arbitrumGoerli: process.env.ARBISCAN_API_KEY,
      // avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
      wannsee: " ",
    },
    customChains: [
      {
        network: "wannsee",
        chainId: 5167003,
        urls: {
          apiURL: "https://wannsee-explorer-v1.mxc.com/api",
          browserURL: "https://wannsee-explorer.mxc.com",
        },
      },
      {
        network: "bytex",
        chainId: 1919,
        urls: {
          apiURL: "https://test.bytescan.io/",
          browserURL: "https://test.bytescan.io/",
        },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
  namedAccounts: {
    deployer: 0,
  },
  mocha: {
    timeout: 100000000,
  },
};

export default config;
