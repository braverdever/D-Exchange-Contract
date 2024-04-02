const hre = require("hardhat");
import { event, swap } from "../typechain-types/contracts";
import { hashString, hashData } from "../utils/hash";
import { expandDecimals } from "../utils/math";
import { deposit } from "./scenes/deposit";
import * as keys from "../utils/keys";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function sendTxn(txnPromise, label) {
    const txn = await txnPromise
    console.info(`Sending ${label}...`)
    await txn.wait()
    console.info(`... Sent! ${txn.hash}`)
    await sleep(2000)
    return txn
}

async function contractAt(name, address, provider) {
    let contractFactory = await ethers.getContractFactory(name)
    if (provider) {
      contractFactory = contractFactory.connect(provider)
    }
    return await contractFactory.attach(address)
  }

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

//   const RoleStore = await hre.ethers.getContractFactory("RoleStore");
//   const roleStore = await RoleStore.deploy(/* constructor arguments */);
//   await roleStore.deployed()

//   console.log("RoleStore deployed to:", roleStore.address);
  const roleStore = await contractAt("RoleStore", "0x6986C3AE1823349a23060d1A87b0218466130559")

  console.log("aria hashString(XODEX = )", hashString("WXODEX"))
  console.log("aria hashString(PEPE = )", hashString("PEPE"))
  console.log("aria hashString(USDT = )", hashString("USDT"))
  console.log("aria hashString(SHIB = )", hashString("SHIB"))

  // console.log("aria key1 = ", keys.minMarketTokensForFirstDeposit("0x413a399D621612168431fB4526d93dDf4D238d71"))
  // console.log("aria key2 = ", expandDecimals(1, 18))
//   await sendTxn(roleStore.grantRole(deployer.address, hashString("CONTROLLER")), "roleStore.setRole(hashString(CONTROLLER))") 
//   await sendTxn(roleStore.grantRole(deployer.address, hashString("ORDER_KEEPER")), "roleStore.setRole(hashString(ORDER_KEEPER))") 
//   await sendTxn(roleStore.grantRole(deployer.address, hashString("ADL_KEEPER")), "roleStore.setRole(hashString(ADL_KEEPER))") 
//   await sendTxn(roleStore.grantRole(deployer.address, hashString("LIQUIDATION_KEEPER")), "roleStore.setRole(hashString(LIQUIDATION_KEEPER))") 
//   await sendTxn(roleStore.grantRole(deployer.address, hashString("MARKET_KEEPER")), "roleStore.setRole(hashString(MARKET_KEEPER))") 
//   await sendTxn(roleStore.grantRole(deployer.address, hashString("FROZEN_ORDER_KEEPER")), "roleStore.setRole(hashString(FROZEN_ORDER_KEEPER))") 
//   console.log("SET role success")

//   const DataStore = await hre.ethers.getContractFactory("DataStore");
//   const dataStore = await DataStore.deploy(roleStore.address);

  const dataStore = await contractAt("DataStore", "0xb6603f6adb18e611e9a9558cB22cf67f560D2f1a")

//   console.log("DataStore deployed to:", dataStore.address);
//   await sendTxn(dataStore.setAddress(hashString("FEE_RECEIVER"), process.env.FEE_RECEIVER), "dataStore.setAddress(hashString(FEE_RECEIVER))")
//   await sendTxn(dataStore.setAddress(hashString("HOLDING_ADDRESS"), process.env.HOLDING_ADDRESS), "dataStore.setAddress(hashString(HOLDING_ADDRESS))")
//   await sendTxn(dataStore.setUint(hashString("MAX_UI_FEE_FACTOR"), process.env.MAX_UI_FEE_FACTOR), "dataStore.setUint(hashString(MAX_UI_FEE_FACTOR))")
//   await sendTxn(dataStore.setUint(hashString("MIN_HANDLE_EXECUTION_ERROR_GAS"), process.env.MIN_HANDLE_EXECUTION_ERROR_GAS), "dataStore.setUint(hashString(MIN_HANDLE_EXECUTION_ERROR_GAS))")
//   await sendTxn(dataStore.setUint(hashString("MIN_HANDLE_EXECUTION_ERROR_GAS_TO_FORWARD"), process.env.MIN_HANDLE_EXECUTION_ERROR_GAS_TO_FORWARD), "dataStore.setUint(hashString(MIN_HANDLE_EXECUTION_ERROR_GAS_TO_FORWARD))")
//   await sendTxn(dataStore.setUint(hashString("MAX_CALLBACK_GAS_LIMIT"), process.env.MAX_CALLBACK_GAS_LIMIT), "dataStore.setUint(hashString(MAX_CALLBACK_GAS_LIMIT))")
//   await sendTxn(dataStore.setUint(hashString("MAX_SWAP_PATH_LENGTH"), process.env.MAX_SWAP_PATH_LENGTH), "dataStore.setUint(hashString(MAX_SWAP_PATH_LENGTH))")
//   await sendTxn(dataStore.setUint(hashString("MIN_COLLATERAL_USD"), process.env.MIN_COLLATERAL_USD), "dataStore.setUint(hashString(MIN_COLLATERAL_USD))")
//   await sendTxn(dataStore.setUint(hashString("MIN_POSITION_SIZE_USD"), process.env.MIN_POSITION_SIZE_USD), "dataStore.setUint(hashString(MIN_POSITION_SIZE_USD))")
//   await sendTxn(dataStore.setUint(hashString("CLAIMABLE_COLLATERAL_TIME_DIVISOR"), process.env.CLAIMABLE_COLLATERAL_TIME_DIVISOR), "dataStore.setUint(hashString(CLAIMABLE_COLLATERAL_TIME_DIVISOR))")
//   await sendTxn(dataStore.setUint("0xefc0960e00ee78ec9c4ac47dfe361c3ed2dc14c6be6004a1e6593b843b045001", process.env.DEPOSIT_GAS_LIMIT_SINGLE), "dataStore.setUint(deposit gas limit single)")
//   await sendTxn(dataStore.setUint("0x8908dc2881f63a92227b283991eab6f534dea09364fb9e935003a7e367855b85", process.env.DEPOSIT_GAS_LIMIT_MULTIPLE), "dataStore.setUint(deposit gas limit multiple)")
//   await sendTxn(dataStore.setUint(hashData(["bytes32"], [hashString("WITHDRAWAL_GAS_LIMIT")]), process.env.WITHDRAWAL_GAS_LIMIT), "dataStore.setUint(WITHDRAWAL_GAS_LIMIT)")
//   await sendTxn(dataStore.setUint(hashString("SINGLE_SWAP_GAS_LIMIT"), process.env.SINGLE_SWAP_GAS_LIMIT), "dataStore.setUint(SINGLE_SWAP_GAS_LIMIT)")
//   await sendTxn(dataStore.setUint(hashString("INCREASE_ORDER_GAS_LIMIT"), process.env.INCREASE_ORDER_GAS_LIMIT), "dataStore.setUint(INCREASE_ORDER_GAS_LIMIT)")
//   await sendTxn(dataStore.setUint(hashString("DECREASE_ORDER_GAS_LIMIT"), process.env.DECREASE_ORDER_GAS_LIMIT), "dataStore.setUint(hashString(DECREASE_ORDER_GAS_LIMIT))")
//   await sendTxn(dataStore.setUint(hashString("SWAP_ORDER_GAS_LIMIT"), process.env.SWAP_ORDER_GAS_LIMIT), "dataStore.setUint(hashString(SWAP_ORDER_GAS_LIMIT))")
//   await sendTxn(dataStore.setUint(hashString("NATIVE_TOKEN_TRANSFER_GAS_LIMIT"), process.env.NATIVE_TOKEN_TRANSFER_GAS_LIMIT), "dataStore.setUint(hashString(NATIVE_TOKEN_TRANSFER_GAS_LIMIT))")
//   await sendTxn(dataStore.setUint(hashString("ESTIMATED_GAS_FEE_BASE_AMOUNT"), process.env.ESTIMATED_GAS_FEE_BASE_AMOUNT), "dataStore.setUint(hashString(ESTIMATED_GAS_FEE_BASE_AMOUNT))")
//   await sendTxn(dataStore.setUint(hashString("ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR"), process.env.ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR), "dataStore.setUint(hashString(ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR))")
//   await sendTxn(dataStore.setUint(hashString("EXECUTION_GAS_FEE_BASE_AMOUNT"), process.env.EXECUTION_GAS_FEE_BASE_AMOUNT), "dataStore.setUint(hashString(EXECUTION_GAS_FEE_BASE_AMOUNT))")
//   await sendTxn(dataStore.setUint(hashString("EXECUTION_GAS_FEE_MULTIPLIER_FACTOR"), process.env.EXECUTION_GAS_FEE_MULTIPLIER_FACTOR), "dataStore.setUint(hashString(EXECUTION_GAS_FEE_MULTIPLIER_FACTOR))")
//   await sendTxn(dataStore.setUint(hashString("SKIP_BORROWING_FEE_FOR_SMALLER_SIDE"), process.env.SKIP_BORROWING_FEE_FOR_SMALLER_SIDE), "dataStore.setUint(hashString(SKIP_BORROWING_FEE_FOR_SMALLER_SIDE))")
//   console.log("SET data success")

//   const EventEmitter = await hre.ethers.getContractFactory("EventEmitter");
//   const eventEmitter = await EventEmitter.deploy(roleStore.address);
//   console.log("EventEmitter deployed to:", eventEmitter.address);

  const eventEmitter = await contractAt("EventEmitter", "0x81F2C1733C65446165474F8b7C4346e0B25c7604")

//   const OracleStore = await hre.ethers.getContractFactory("OracleStore");
//   const oracleStore = await OracleStore.deploy(roleStore.address, eventEmitter.address);
//   console.log("OracleStore deployed to:", oracleStore.address);

  const oracleStore = await contractAt("OracleStore", "0x0ad70eeE8E1b93c4CDaAc5569E3f2691fFfAa499")


//   await sendTxn(roleStore.grantRole(oracleStore.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))") 
//   await sendTxn(oracleStore.addSigner(process.env.ORACLE_SIGNER), "roleStore.addSigner()") 

//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("TOKEN_TRANSFER_GAS_LIMIT"), process.env.WMXC]), process.env.WMXC_FEE), "dataStore.setUint(deposit gas limit multiple)")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("TOKEN_TRANSFER_GAS_LIMIT"), process.env.DG]), process.env.DG_FEE), "dataStore.setUint(deposit gas limit multiple)")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("TOKEN_TRANSFER_GAS_LIMIT"), process.env.PARK]), process.env.PARK_FEE), "dataStore.setUint(deposit gas limit multiple)")
//   await sendTxn(dataStore.setAddress(hashString("WNT"), process.env.WMXC), "dataStore.setAddress(WMXC)")

//   const WMXCMockPriceFeed = await hre.ethers.getContractFactory("MockPriceFeed");
//   const wMXCMockPriceFeed = await WMXCMockPriceFeed.deploy();
//   await sendTxn(wMXCMockPriceFeed.setAnswer(process.env.WMXC_INIT_PRICE), "setAnswer(process.env.WMXC_INIT_PRICE)")
//   console.log("wMXCMockPriceFeed deployed to:", wMXCMockPriceFeed.address);
  const wMXCMockPriceFeed = await contractAt("MockPriceFeed", "0xd6C4edeAf0Da440A177f903C107c8D06E262749E")

//   const DGMockPriceFeed = await hre.ethers.getContractFactory("MockPriceFeed");
//   const dGCMockPriceFeed = await DGMockPriceFeed.deploy();
//   await sendTxn(dGCMockPriceFeed.setAnswer(process.env.DG_INIT_PRICE), "setAnswer(process.env.DG_INIT_PRICE)")
//   console.log("DGCMockPriceFeed deployed to:", dGCMockPriceFeed.address);
  const dGCMockPriceFeed = await contractAt("MockPriceFeed", "0x7353dCed1C0D46a9Ef5F6F9C4e08cd3BC56c368B")

//   const PARKMockPriceFeed = await hre.ethers.getContractFactory("MockPriceFeed");
//   const pARKMockPriceFeed = await PARKMockPriceFeed.deploy();
//   await sendTxn(pARKMockPriceFeed.setAnswer(process.env.PARK_INIT_PRICE), "setAnswer(process.env.PARK_INIT_PRICE)")
//   console.log("PARKMockPriceFeed deployed to:", pARKMockPriceFeed.address);
  const pARKMockPriceFeed = await contractAt("MockPriceFeed", "0x9fCeceF3B06F16F8CD10B05D61640e0c42948621")

//   await sendTxn(dataStore.setBytes32(hashData(["bytes32", "address"], [hashString("ORACLE_TYPE"), process.env.WMXC]), process.env.ORACLE_TYPE), "dataStore.setBytes32(WMXC_TYPE)")
//   await sendTxn(dataStore.setBytes32(hashData(["bytes32", "address"], [hashString("ORACLE_TYPE"), process.env.DG]), process.env.ORACLE_TYPE), "dataStore.setBytes32(DG)")
//   await sendTxn(dataStore.setBytes32(hashData(["bytes32", "address"], [hashString("ORACLE_TYPE"), process.env.PARK]), process.env.ORACLE_TYPE), "dataStore.setBytes32(PARK)")
//   await sendTxn(dataStore.setAddress(hashData(["bytes32", "address"], [hashString("PRICE_FEED"), process.env.WMXC]), wMXCMockPriceFeed.address), "dataStore.setAddress(wMXCMockPriceFeed)")
//   await sendTxn(dataStore.setAddress(hashData(["bytes32", "address"], [hashString("PRICE_FEED"), process.env.DG]), dGCMockPriceFeed.address), "dataStore.setAddress(dGCMockPriceFeed)")
//   await sendTxn(dataStore.setAddress(hashData(["bytes32", "address"], [hashString("PRICE_FEED"), process.env.PARK]), pARKMockPriceFeed.address), "dataStore.setAddress(pARKMockPriceFeed)")

//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("PRICE_FEED_MULTIPLIER"), process.env.WMXC]), expandDecimals(1, 44)), "dataStore.setUint(WMXC)")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("PRICE_FEED_MULTIPLIER"), process.env.DG]), expandDecimals(1, 44)), "dataStore.setUint(DG)")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("PRICE_FEED_MULTIPLIER"), process.env.PARK]), expandDecimals(1, 44)), "dataStore.setUint(PARK)")

//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("PRICE_FEED_HEARTBEAT_DURATION"), process.env.WMXC]), process.env.HEARTBEAT_DURATION), "dataStore.setUint(WMXC)")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("PRICE_FEED_HEARTBEAT_DURATION"), process.env.DG]), process.env.HEARTBEAT_DURATION), "dataStore.setUint(DG)")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("PRICE_FEED_HEARTBEAT_DURATION"), process.env.PARK]), process.env.HEARTBEAT_DURATION), "dataStore.setUint(PARK)")


//   const OrderVault = await hre.ethers.getContractFactory("OrderVault");
//   const orderVault = await OrderVault.deploy(roleStore.address, dataStore.address);
//   console.log("OrderVault deployed to:", orderVault.address);
  const orderVault = await contractAt("OrderVault", "0x2921cC3c9eB8Ee829b7b4eF3c5101d5A2Ca37974")

//   const MockRealtimeFeedVerifier = await hre.ethers.getContractFactory("MockRealtimeFeedVerifier");
//   const mockRealtimeFeedVerifier = await MockRealtimeFeedVerifier.deploy();
//   console.log("MockRealtimeFeedVerifier deployed to:", mockRealtimeFeedVerifier.address);
  const mockRealtimeFeedVerifier = await contractAt("MockRealtimeFeedVerifier", "0x412484F4bC2f4efe588A22AD865472d1b815bBc8")

//   const Oracle = await hre.ethers.getContractFactory("Oracle");
//   const oracle = await Oracle.deploy(roleStore.address, oracleStore.address, mockRealtimeFeedVerifier.address);
//   console.log("Oracle deployed to:", oracle.address);
  const oracle = await contractAt("Oracle", "0x49c664823a0D797B9cA15a3D884E27E984878F57")

//   await sendTxn(dataStore.setUint(hashString("MIN_ORACLE_BLOCK_CONFIRMATIONS"), process.env.MIN_ORACLE_BLOCK_CONFIRMATIONS), "dataStore.setUint(MIN_ORACLE_BLOCK_CONFIRMATIONS)")
//   await sendTxn(dataStore.setUint(hashString("MAX_ORACLE_PRICE_AGE"), process.env.MAX_ORACLE_PRICE_AGE), "dataStore.setUint(MAX_ORACLE_PRICE_AGE)")
//   await sendTxn(dataStore.setUint(hashString("MAX_ORACLE_REF_PRICE_DEVIATION_FACTOR"), process.env.MAX_ORACLE_REF_PRICE_DEVIATION_FACTOR), "dataStore.setUint(MAX_ORACLE_REF_PRICE_DEVIATION_FACTOR)")

//   await sendTxn(roleStore.grantRole(oracle.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))") 


//   const MarketEventUtils = await ethers.getContractFactory("MarketEventUtils");
//   const marketEventUtils = await MarketEventUtils.deploy();
//   await marketEventUtils.deployed();
//   console.log("MarketEventUtils deployed to:", marketEventUtils.address);

  const marketEventUtils = await contractAt("MarketEventUtils", "0x0FE4c9f78B6188C5f1a2c8A8b69f80bBD07bAc56")


//   const MarketStoreUtils = await ethers.getContractFactory("MarketStoreUtils");
//   const marketStoreUtils = await MarketStoreUtils.deploy();
//   await marketStoreUtils.deployed();
//   console.log("MarketStoreUtils deployed to:", marketStoreUtils.address);
  const marketStoreUtils = await contractAt("MarketStoreUtils", "0x8d3B01bBFe0b58B8CBc566A9F836ec557ba0262B")

//   const MarketUtils = await ethers.getContractFactory("MarketUtils", {
//     libraries: {
//         MarketEventUtils: marketEventUtils.address,
//         MarketStoreUtils: marketStoreUtils.address,
//     }
//   });
//   const marketUtils = await MarketUtils.deploy();
//   await marketUtils.deployed();
//   console.log("MarketUtils deployed to:", marketUtils.address);
//   const marketUtils = await contractAt("MarketUtils", "0xb2de432405A72db360613A01F9B8913F45202B4c")

//   const FeeUtils = await ethers.getContractFactory("FeeUtils", {
//     libraries: {
//         MarketUtils: marketUtils.address,
//     }
//   });
//   const feeUtils = await FeeUtils.deploy();
//   await feeUtils.deployed();
//   console.log("FeeUtils deployed to:", feeUtils.address);
//   const feeUtils = await contractAt("FeeUtils", "0x1C683248C103AAFEFffB064EFC2Fb15789c06b10")

  
//   const SwapPricingUtils = await ethers.getContractFactory("SwapPricingUtils");
//   const swapPricingUtils = await SwapPricingUtils.deploy();
//   await swapPricingUtils.deployed();
//   console.log("SwapPricingUtils deployed to:", swapPricingUtils.address);
  const swapPricingUtils = await contractAt("SwapPricingUtils", "0xf0929c14987F930d67f1888e61D3fdA93133Be8D")
  
//   const SwapUtils = await ethers.getContractFactory("SwapUtils", {
//     libraries: {
//       FeeUtils: feeUtils.address,
//       MarketEventUtils: marketEventUtils.address,
//       SwapPricingUtils: swapPricingUtils.address,
//     },
//   });
//   const swapUtils = await SwapUtils.deploy();
//   await swapUtils.deployed();
//   console.log("SwapUtils deployed to:", swapUtils.address);
//   const swapUtils = await contractAt("SwapUtils", "0x931FabeDb0CF4a089Ab415D4303C36776474e8D3")

//   const SwapHandler = await ethers.getContractFactory("SwapHandler", {
//     libraries: {
//       SwapUtils: swapUtils.address, // Ensure this matches the deployed library's address
//     },
//   });
//   const swapHandler = await SwapHandler.deploy(roleStore.address);
//   console.log("SwapHandler deployed to:", swapHandler.address);
//   const swapHandler = await contractAt("SwapHandler", "0x0055d96bd59F84D9c73a0aB23176B86719E58983")

//   await sendTxn(roleStore.grantRole(swapHandler.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))") 

//   const ReferralStorage = await hre.ethers.getContractFactory("ReferralStorage");
//   const referralStorage = await ReferralStorage.deploy();
//   console.log("ReferralStorage deployed to:", referralStorage.address);
  const referralStorage = await contractAt("ReferralStorage", "0x7122c5023A7EA92b6de5c807f257256d6509caC5")

//   await sendTxn(referralStorage.setTier(0, 1000, 5000), "referralStorage.setTier(0, 1000, 5000)") 
//   await sendTxn(referralStorage.setTier(1, 2000, 5000), "referralStorage.setTier(1, 2000, 5000)") 
//   await sendTxn(referralStorage.setTier(2, 2500, 4000), "referralStorage.setTier(2, 2500, 4000)") 

//   const OrderStoreUtils = await hre.ethers.getContractFactory("OrderStoreUtils");
//   const orderStoreUtils = await OrderStoreUtils.deploy();
//   console.log("OrderStoreUtils deployed to:", orderStoreUtils.address);
  const orderStoreUtils = await contractAt("OrderStoreUtils", "0xd4Ec0327FdD1403435B2f517857B6f96Daf9d3c2")

//   const PositionStoreUtils = await hre.ethers.getContractFactory("PositionStoreUtils");
//   const positionStoreUtils = await PositionStoreUtils.deploy();
//   console.log("PositionStoreUtils deployed to:", positionStoreUtils.address);
  const positionStoreUtils = await contractAt("PositionStoreUtils", "0x8896C223e77F9F8EBAE8C651ce46652cB44f5195")

//   const OrderEventUtils = await hre.ethers.getContractFactory("OrderEventUtils");
//   const orderEventUtils = await OrderEventUtils.deploy();
//   console.log("OrderEventUtils deployed to:", orderEventUtils.address);
const orderEventUtils = await contractAt("OrderEventUtils", "0x220A0eBab5e5cE4D8afc1E0D0FB219A35E7433cA")

//   const GasUtils = await hre.ethers.getContractFactory("GasUtils");
//   const gasUtils = await GasUtils.deploy();
//   console.log("GasUtils deployed to:", gasUtils.address);
const gasUtils = await contractAt("GasUtils", "0xed1c915dE6A7f8E38E94c0C12925777ce7c26d43")

// const PositionEventUtils = await hre.ethers.getContractFactory("PositionEventUtils");
// const positionEventUtils = await PositionEventUtils.deploy();
// console.log("PositionEventUtils deployed to:", positionEventUtils.address);
const positionEventUtils = await contractAt("PositionEventUtils", "0xC408e3DFfC4a64d0890024C5318dDcf2aaE7f144")

// const PositionUtils = await hre.ethers.getContractFactory("PositionUtils", {
//     libraries: {
//         MarketStoreUtils: marketStoreUtils.address,
//     }
// });
// const positionUtils = await PositionUtils.deploy();
// console.log("PositionUtils deployed to:", positionUtils.address);
// const positionUtils = await contractAt("PositionUtils", "0xb57df1b8cF0e214c6afE9c9BdA9F677e6Cf2adB6")

// const DecreasePositionSwapUtils = await hre.ethers.getContractFactory("DecreasePositionSwapUtils");
// const decreasePositionSwapUtils = await DecreasePositionSwapUtils.deploy();
// console.log("DecreasePositionSwapUtils deployed to:", decreasePositionSwapUtils.address);
// const decreasePositionSwapUtils = await contractAt("DecreasePositionSwapUtils", "0xADFE1213C3C7a08a87f45a67e39a98957EA63458")

//   const DecreasePositionCollateralUtils = await hre.ethers.getContractFactory("DecreasePositionCollateralUtils", {
//     libraries: {
//         FeeUtils: "0x1C683248C103AAFEFffB064EFC2Fb15789c06b10",
//         MarketEventUtils: marketEventUtils.address,
//         OrderEventUtils: orderEventUtils.address,
//         DecreasePositionSwapUtils: decreasePositionSwapUtils.address,
//         PositionEventUtils: positionEventUtils.address,
//         PositionUtils: positionUtils.address,
//     }
//   });
//   const decreasePositionCollateralUtils = await DecreasePositionCollateralUtils.deploy();
//   console.log("DecreasePositionCollateralUtils deployed to:", decreasePositionCollateralUtils.address);
// const decreasePositionCollateralUtils = await contractAt("DecreasePositionCollateralUtils", "0xaeeD420DBE6CBAE943325A3f852Dd2De88Bd939f")

//   const ReferralEventUtils = await hre.ethers.getContractFactory("ReferralEventUtils");
//   const referralEventUtils = await ReferralEventUtils.deploy();
//   console.log("ReferralEventUtils deployed to:", referralEventUtils.address);
  const referralEventUtils = await contractAt("ReferralEventUtils", "0x3E80EC823f2162A0c47C8E02D183204d3A3F7016")

//   const DecreasePositionUtils = await hre.ethers.getContractFactory("DecreasePositionUtils", {
//     libraries: {
//         MarketEventUtils: marketEventUtils.address,
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c",
//         OrderEventUtils: orderEventUtils.address,
//         DecreasePositionCollateralUtils: "0xaeeD420DBE6CBAE943325A3f852Dd2De88Bd939f",
//         DecreasePositionSwapUtils: "0xADFE1213C3C7a08a87f45a67e39a98957EA63458",
//         PositionEventUtils: positionEventUtils.address,
//         PositionStoreUtils: positionStoreUtils.address,
//         PositionUtils: "0xb57df1b8cF0e214c6afE9c9BdA9F677e6Cf2adB6",
//         ReferralEventUtils: referralEventUtils.address,
//     }
//   });
//   const decreasePositionUtils = await DecreasePositionUtils.deploy();
//   console.log("DecreasePositionUtils deployed to:", decreasePositionUtils.address);
// 0xA60A2DEDd5703Ca03D2e607e0e41FFAE2aB0DD71

//   const DecreaseOrderUtils = await hre.ethers.getContractFactory("DecreaseOrderUtils", {
//     libraries: {
//         DecreasePositionUtils: "0xA60A2DEDd5703Ca03D2e607e0e41FFAE2aB0DD71",
//         PositionStoreUtils: positionStoreUtils.address,
//     }
//   });
//   const decreaseOrderUtils = await DecreaseOrderUtils.deploy();
//   console.log("DecreaseOrderUtils deployed to:", decreaseOrderUtils.address);
// 0x81062729fbeec6EF75aE9bF836eD2d922d20cdDF

//   const IncreasePositionUtils = await hre.ethers.getContractFactory("IncreasePositionUtils", {
//     libraries: {
//         FeeUtils: "0x1C683248C103AAFEFffB064EFC2Fb15789c06b10",
//         MarketEventUtils: marketEventUtils.address,
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c",
//         PositionEventUtils: positionEventUtils.address,
//         PositionStoreUtils: positionStoreUtils.address,
//         PositionUtils: "0xb57df1b8cF0e214c6afE9c9BdA9F677e6Cf2adB6",
//         ReferralEventUtils: referralEventUtils.address,
//     }
//   });
//   const increasePositionUtils = await IncreasePositionUtils.deploy();
//   console.log("IncreasePositionUtils deployed to:", increasePositionUtils.address);
// 0x5FeE961Ebd0e93bE245Fb58041B124DFA83F3324

//   const IncreaseOrderUtils = await hre.ethers.getContractFactory("IncreaseOrderUtils", {
//     libraries: {
//         IncreasePositionUtils: "0x5FeE961Ebd0e93bE245Fb58041B124DFA83F3324",
//         PositionStoreUtils: positionStoreUtils.address,
//         SwapUtils: "0x931FabeDb0CF4a089Ab415D4303C36776474e8D3",
//     }
//   });
//   const increaseOrderUtils = await IncreaseOrderUtils.deploy();
//   console.log("IncreaseOrderUtils deployed to:", increaseOrderUtils.address);
// 0x99CF7c329fF2B7D574D687374Fdd114b2d0b0dFE

//   const SwapOrderUtils = await hre.ethers.getContractFactory("SwapOrderUtils", {
//     libraries: {
//         SwapUtils: "0x931FabeDb0CF4a089Ab415D4303C36776474e8D3",
//     }
//   });
//   const swapOrderUtils = await SwapOrderUtils.deploy();
//   console.log("SwapOrderUtils deployed to:", swapOrderUtils.address);
// 0x1AdCFae316ebCb9e196fbB4B78E50f696da3bB4f

//   const AdlUtils = await hre.ethers.getContractFactory("AdlUtils", {
//     libraries: {
//         MarketStoreUtils: marketStoreUtils.address,
//         OrderEventUtils: orderEventUtils.address,
//         OrderStoreUtils: orderStoreUtils.address,
//         PositionStoreUtils: positionStoreUtils.address,
//     }
//   });
//   const adlUtils = await AdlUtils.deploy();
//   console.log("AdlUtils deployed to:", adlUtils.address);
// 0x762cdFb0B2F39f3ae65C9e2AD311712694b0f223


//   const OrderUtils = await hre.ethers.getContractFactory("OrderUtils", {
//     libraries: {
//         DecreaseOrderUtils: "0x81062729fbeec6EF75aE9bF836eD2d922d20cdDF",
//         IncreaseOrderUtils: "0x99CF7c329fF2B7D574D687374Fdd114b2d0b0dFE",
//         OrderEventUtils: orderEventUtils.address,
//         OrderStoreUtils: orderStoreUtils.address,
//         SwapOrderUtils: "0x1AdCFae316ebCb9e196fbB4B78E50f696da3bB4f",
//         GasUtils: gasUtils.address,
//         MarketStoreUtils: marketStoreUtils.address,
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c",
//     }
//   });
//   const orderUtils = await OrderUtils.deploy();
//   console.log("OrderUtils deployed to:", orderUtils.address);
// 0x384E36ccC5Edbc27c1175Cc8E9ba4b5a90e7578A

//   const AdlHandler = await hre.ethers.getContractFactory("AdlHandler", {
//     libraries: {
//         AdlUtils: "0x762cdFb0B2F39f3ae65C9e2AD311712694b0f223",
//         MarketStoreUtils: marketStoreUtils.address,
//         OrderStoreUtils: orderStoreUtils.address,
//         OrderUtils: "0x384E36ccC5Edbc27c1175Cc8E9ba4b5a90e7578A",
//     }
//   });
//   const adlHandler = await AdlHandler.deploy(roleStore.address, dataStore.address, eventEmitter.address, orderVault.address, oracle.address, "0x0055d96bd59F84D9c73a0aB23176B86719E58983", referralStorage.address); //0x0055d96bd59F84D9c73a0aB23176B86719E58983 is swapHandler.address
//   console.log("AdlHandler deployed to:", adlHandler.address);
// 0xEfdC259F967E036980E597Ca0e99E901DBD19c27

//   await sendTxn(roleStore.grantRole(adlHandler.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))") 

//   const MarketFactory = await hre.ethers.getContractFactory("MarketFactory", {
//     libraries: {
//         MarketStoreUtils: marketStoreUtils.address,
//     }
//   });
// //   const marketFactory = await MarketFactory.deploy(roleStore.address, dataStore.address, eventEmitter.address);
// const marketFactory = await contractAt("MarketFactory", "0xdB1D794Aa7678594fE0f8415D7D3e62D177114C4")

//   await sendTxn(roleStore.grantRole(marketFactory.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))")
//   0xdB1D794Aa7678594fE0f8415D7D3e62D177114C4

//   const Config = await hre.ethers.getContractFactory("Config", {
//     libraries: {
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c",
//     }
//   });
//   const config = await Config.deploy(roleStore.address, dataStore.address, eventEmitter.address);
//   console.log("Config deployed to:", config.address);
// 0xeE2B3eD2939170884B96952492Db6a9E8acf33eF

//   await sendTxn(roleStore.grantRole(config.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))")

//   const DepositVault = await hre.ethers.getContractFactory("DepositVault");
//   const depositVault = await DepositVault.deploy(roleStore.address, dataStore.address);
//   console.log("DepositVault deployed to:", depositVault.address);
  const depositVault = await contractAt("DepositVault", "0x5d4E238873413c47104Ba78F94Ea88a82680acea")

//   const DepositStoreUtils = await hre.ethers.getContractFactory("DepositStoreUtils");
//   const depositStoreUtils = await DepositStoreUtils.deploy();
//   console.log("DepositStoreUtils deployed to:", depositStoreUtils.address);
  const depositStoreUtils = await contractAt("DepositStoreUtils", "0xbAf52e90824479A42ebEFDb8C4B2AF7Fe2A79AE0")

//   const DepositEventUtils = await hre.ethers.getContractFactory("DepositEventUtils");
//   const depositEventUtils = await DepositEventUtils.deploy();
//   console.log("DepositEventUtils deployed to:", depositEventUtils.address);
  const depositEventUtils = await contractAt("DepositEventUtils", "0xA1403cEd024F580AA3c969d893ad1d795911bb0d")

//   const DepositUtils = await hre.ethers.getContractFactory("DepositUtils", {
//     libraries: {
//         DepositEventUtils: depositEventUtils.address,
//         DepositStoreUtils: depositStoreUtils.address,
//         GasUtils: gasUtils.address,
//         MarketStoreUtils: marketStoreUtils.address,
//     }
//   });
//   const depositUtils = await DepositUtils.deploy();
//   console.log("DepositUtils deployed to:", depositUtils.address);
// 0xba8a68a687554bEF6303445D8f7a5F25cAE03563

//   const ExecuteDepositUtils = await hre.ethers.getContractFactory("ExecuteDepositUtils", {
//     libraries: {
//         DepositEventUtils: depositEventUtils.address,
//         DepositStoreUtils: depositStoreUtils.address,
//         FeeUtils: "0x1C683248C103AAFEFffB064EFC2Fb15789c06b10",
//         GasUtils: gasUtils.address,
//         MarketEventUtils: marketEventUtils.address,
//         MarketStoreUtils: marketStoreUtils.address,
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c",
//         SwapPricingUtils: swapPricingUtils.address,
//         SwapUtils: "0x931FabeDb0CF4a089Ab415D4303C36776474e8D3"
//     }
//   });
//   const executeDepositUtils = await ExecuteDepositUtils.deploy();
//   console.log("ExecuteDepositUtils deployed to:", executeDepositUtils.address);
// 0xe2b9CfE475BE956e34008c1C2d74826751cd2171

//   const DepositHandler = await hre.ethers.getContractFactory("DepositHandler", {
//     libraries: {
//         DepositStoreUtils: depositStoreUtils.address,
//         DepositUtils: "0xba8a68a687554bEF6303445D8f7a5F25cAE03563",
//         ExecuteDepositUtils: executeDepositUtils.address,
//     }
//   });
//   const depositHandler = await DepositHandler.deploy(roleStore.address, dataStore.address, eventEmitter.address, depositVault.address, oracle.address);
//   console.log("DepositHandler deployed to:", depositHandler.address);
// 0x74812f2Ada9ecb4aF8a8DC92D43ED0fFc6AeCC02
//   await sendTxn(roleStore.grantRole(depositHandler.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))")

//   const Router = await hre.ethers.getContractFactory("Router");
//   const router = await Router.deploy(roleStore.address);
//   console.log("Router deployed to:", router.address);
  const router = await contractAt("Router", "0x468c2EeA5e1f28a857Ff6940854fF0dFc0B48C56")

//   const WithdrawalVault = await hre.ethers.getContractFactory("WithdrawalVault");
//   const withdrawalVault = await WithdrawalVault.deploy(roleStore.address, dataStore.address);
//   console.log("WithdrawalVault deployed to:", withdrawalVault.address);
const withdrawalVault = await contractAt("WithdrawalVault", "0x8D489A49c791D434adFed25b14D50E4b84A0A4Cb")

// const WithdrawalStoreUtils = await hre.ethers.getContractFactory("WithdrawalStoreUtils");
// const withdrawalStoreUtils = await WithdrawalStoreUtils.deploy();
// console.log("WithdrawalStoreUtils deployed to:", withdrawalStoreUtils.address);
const withdrawalStoreUtils = await contractAt("WithdrawalStoreUtils", "0xBbb0beebf02c661698E59f942109B9B4991f123c")

// const WithdrawalEventUtils = await hre.ethers.getContractFactory("WithdrawalEventUtils");
// const withdrawalEventUtils = await WithdrawalEventUtils.deploy();
// console.log("WithdrawalEventUtils deployed to:", withdrawalEventUtils.address);
const withdrawalEventUtils = await contractAt("WithdrawalEventUtils", "0x74Eb9Cb203272844fE54dE7Aff80B6479ba6d05B")

//   const ExecuteWithdrawalUtils = await hre.ethers.getContractFactory("ExecuteWithdrawalUtils", {
//     libraries: {
//         FeeUtils: "0x1C683248C103AAFEFffB064EFC2Fb15789c06b10",
//         GasUtils: gasUtils.address,
//         MarketEventUtils: marketEventUtils.address,
//         MarketStoreUtils: marketStoreUtils.address,
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c",
//         SwapPricingUtils: swapPricingUtils.address,
//         SwapUtils: "0x931FabeDb0CF4a089Ab415D4303C36776474e8D3",
//         WithdrawalEventUtils: withdrawalEventUtils.address,
//         WithdrawalStoreUtils: withdrawalStoreUtils.address
//     }
//   });
//   const executeWithdrawalUtils = await ExecuteWithdrawalUtils.deploy();
//   console.log("ExecuteWithdrawalUtils deployed to:", executeWithdrawalUtils.address);
// 0xb954A5F9476e2945e553B6dE05C02115f2a93176


//   const WithdrawalUtils = await hre.ethers.getContractFactory("WithdrawalUtils", {
//     libraries: {
//         GasUtils: gasUtils.address,
//         MarketStoreUtils: marketStoreUtils.address,
//         WithdrawalEventUtils: withdrawalEventUtils.address,
//         WithdrawalStoreUtils: withdrawalStoreUtils.address,
//     }
//   });
//   const withdrawalUtils = await WithdrawalUtils.deploy();
//   console.log("WithdrawalUtils deployed to:", withdrawalUtils.address);
// 0x352B6C271c9049e54988F4ed629e1491B3E1039D

//   const WithdrawalHandler = await hre.ethers.getContractFactory("WithdrawalHandler", {
//     libraries: {
//         ExecuteWithdrawalUtils: '0xb954A5F9476e2945e553B6dE05C02115f2a93176',
//         WithdrawalStoreUtils: withdrawalStoreUtils.address,
//         WithdrawalUtils: "0x352B6C271c9049e54988F4ed629e1491B3E1039D",
//     }
//   });
//   const withdrawalHandler = await WithdrawalHandler.deploy(roleStore.address, dataStore.address, eventEmitter.address, withdrawalVault.address, oracle.address);
//   console.log("WithdrawalHandler deployed to:", withdrawalHandler.address);
//   0x94A5ab072BF122f44D6a361A78013CeAbDcB9381

//   await sendTxn(roleStore.grantRole(withdrawalHandler.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))")

//   const OrderHandler = await hre.ethers.getContractFactory("OrderHandler", {
//     libraries: {
//         MarketStoreUtils: marketStoreUtils.address,
//         OrderEventUtils: orderEventUtils.address,
//         OrderStoreUtils: orderStoreUtils.address,
//         OrderUtils: "0x384E36ccC5Edbc27c1175Cc8E9ba4b5a90e7578A",
//     }
//   });
//   const orderHandler = await OrderHandler.deploy(roleStore.address, dataStore.address, eventEmitter.address, orderVault.address, oracle.address, "0x0055d96bd59F84D9c73a0aB23176B86719E58983", referralStorage.address);
//   console.log("orderHandler deployed to:", orderHandler.address);
//   0x17a5755915c015bfce203De18eea9640Fb082c61

//   await sendTxn(referralStorage.setHandler(orderHandler.address, true), "referralStorage.setHandler(orderHandler.address, true)")  
//   await sendTxn(roleStore.grantRole(orderHandler.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))")  

//   const CallbackUtils = await hre.ethers.getContractFactory("CallbackUtils");
//   const callbackUtils = await CallbackUtils.deploy();
//   console.log("CallbackUtils deployed to:", callbackUtils.address);
  const callbackUtils = await contractAt("CallbackUtils", "0xECc407ad8cF159cF94300dBAA7d07d79C47156fC")

//   const ReferralUtils = await hre.ethers.getContractFactory("ReferralUtils", {
//     libraries: {
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c",
//         ReferralEventUtils: referralEventUtils.address,
//     }
//   });
//   const referralUtils = await ReferralUtils.deploy();
//   console.log("ReferralUtils deployed to:", referralUtils.address);
// 0x7A3ACEEEc71B62bE744082e6c125caB87D4cDa63

//   const ExchangeRouter = await hre.ethers.getContractFactory("ExchangeRouter", {
//     libraries: {
//         CallbackUtils: callbackUtils.address,
//         DepositStoreUtils: depositStoreUtils.address,
//         FeeUtils: "0x1C683248C103AAFEFffB064EFC2Fb15789c06b10",
//         MarketEventUtils: marketEventUtils.address,
//         MarketStoreUtils: marketStoreUtils.address,
//         OrderStoreUtils: orderStoreUtils.address,
//         ReferralUtils: "0x7A3ACEEEc71B62bE744082e6c125caB87D4cDa63",
//         WithdrawalStoreUtils: withdrawalStoreUtils.address,
//     }
//   });
//   const exchangeRouter = await ExchangeRouter.deploy(router.address, roleStore.address, dataStore.address, eventEmitter.address, "0x74812f2Ada9ecb4aF8a8DC92D43ED0fFc6AeCC02", "0x94A5ab072BF122f44D6a361A78013CeAbDcB9381", "0x17a5755915c015bfce203De18eea9640Fb082c61"); //0x74812f2Ada9ecb4aF8a8DC92D43ED0fFc6AeCC02 is depositHandler.address, 0x94A5ab072BF122f44D6a361A78013CeAbDcB9381 is withdrawalHandler.address, 0x17a5755915c015bfce203De18eea9640Fb082c61 is orderHandler.address
//   console.log("ExchangeRouter deployed to:", exchangeRouter.address);
//   0x9346aFa4824177b0b0eCC2C9B5bC6f2aA86f9AB1

//   await sendTxn(roleStore.grantRole(exchangeRouter.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))")  
//   await sendTxn(roleStore.grantRole(exchangeRouter.address, hashString("ROUTER_PLUGIN")), "roleStore.grantRole(hashString(ROUTER_PLUGIN))")  

//   const FeeHandler = await hre.ethers.getContractFactory("FeeHandler", {
//     libraries: {
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c"
//     }
//   });
//   const feeHandler = await FeeHandler.deploy(roleStore.address, dataStore.address, eventEmitter.address);
//   console.log("FeeHandler deployed to:", feeHandler.address);
//   await sendTxn(roleStore.grantRole(feeHandler.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))")  
//   0xF9d456b2185Ca3b9bE336530fde8977Fa3ADF293

//   const GovTimelockController = await hre.ethers.getContractFactory("GovTimelockController");
//   const govTimelockController = await GovTimelockController.deploy("GMX Gov Timelock Controller", 24 * 60 * 60, ["0xdFF9Bf98d042A609b70BEd7667fC81eb23799a7A"], ["0xdFF9Bf98d042A609b70BEd7667fC81eb23799a7A"], "0xdFF9Bf98d042A609b70BEd7667fC81eb23799a7A");
//   console.log("GovTimelockController deployed to:", govTimelockController.address);
  const govTimelockController = await contractAt("GovTimelockController", "0xa57fD49EF7002864Cf06694c9a32d543f8C01411")

//   const GovToken = await hre.ethers.getContractFactory("GovToken");
//   const govToken = await GovToken.deploy(roleStore.address, "GMX DAO", "GMX DAO", 18);
//   console.log("GovToken deployed to:", govToken.address);
const govToken = await contractAt("GovToken", "0x08a67C977a4Cc920C8cbB1eF9DAb846Be59250DD")

//   const LiquidationUtils = await hre.ethers.getContractFactory("LiquidationUtils", {
//     libraries: {
//         OrderEventUtils: orderEventUtils.address,
//         OrderStoreUtils: orderStoreUtils.address,
//         PositionStoreUtils: positionStoreUtils.address,
//     }
//   });
//   const liquidationUtils = await LiquidationUtils.deploy();
//   console.log("LiquidationUtils deployed to:", liquidationUtils.address);
// 0x07eB9Db1DAB9CbA35fbAca178A8B195985b32AF5

//   const LiquidationHandler = await hre.ethers.getContractFactory("LiquidationHandler", {
//     libraries: {
//         LiquidationUtils: liquidationUtils.address,
//         MarketStoreUtils: marketStoreUtils.address,
//         OrderStoreUtils: orderStoreUtils.address,
//         OrderUtils: "0x384E36ccC5Edbc27c1175Cc8E9ba4b5a90e7578A",
//     }
//   });
//   const liquidationHandler = await LiquidationHandler.deploy(roleStore.address, dataStore.address, eventEmitter.address, orderVault.address, oracle.address, "0x0055d96bd59F84D9c73a0aB23176B86719E58983", referralStorage.address);
//   console.log("LiquidationHandler deployed to:", liquidationHandler.address);
// 0x02FECAF695F19AC4A3f0a92F6D638cF54D63fD6E

//   await sendTxn(roleStore.grantRole(liquidationHandler.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))")  

//   const MockPriceFeed = await hre.ethers.getContractFactory("MockPriceFeed");
//   const mockPriceFeed = await MockPriceFeed.deploy();
//   console.log("MockPriceFeed deployed to:", mockPriceFeed.address);
  const mockPriceFeed = await contractAt("MockPriceFeed", "0xAaf025048b63fa1D7Aadd7b9395fBac2084067b2")

//   const Multicall3 = await hre.ethers.getContractFactory("Multicall3");
//   const multicall3 = await Multicall3.deploy();
//   console.log("Multicall3 deployed to:", multicall3.address);
const multicall3 = await contractAt("Multicall3", "0xb132a46DD6E2874c0Fb3CEccCbDa18D05955f6aA")

//   const ProtocolGovernor = await hre.ethers.getContractFactory("ProtocolGovernor");
//   const protocolGovernor = await ProtocolGovernor.deploy(govToken.address, govTimelockController.address, "GMX Governor", "v2.0", 24 * 60 * 60, 5 * 24 * 60 * 60, expandDecimals(30_000, 18), 4);
//   console.log("ProtocolGovernor deployed to:", protocolGovernor.address);
const protocolGovernor = await contractAt("ProtocolGovernor", "0x4450C15a2eCf43BE22C83b4FcF32eC6b69dCACAB")

//   const ReaderDepositUtils = await hre.ethers.getContractFactory("ReaderDepositUtils", {
//     libraries: {
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c", 
//     }
//   });
//   const readerDepositUtils = await ReaderDepositUtils.deploy();
//   console.log("ReaderDepositUtils deployed to:", readerDepositUtils.address);
// 0xd1d986C1Bf93891e15fe89778D42e3d0e47ABB99

//   const ReaderPricingUtils = await hre.ethers.getContractFactory("ReaderPricingUtils", {
//     libraries: {
//         PositionUtils: "0xb57df1b8cF0e214c6afE9c9BdA9F677e6Cf2adB6"
//     }
//   });
//   const readerPricingUtils = await ReaderPricingUtils.deploy();
//   console.log("ReaderPricingUtils deployed to:", readerPricingUtils.address);
// 0x3438755d5d889b0e877aD119b3d08E7D14b99325

//   const ReaderUtils = await hre.ethers.getContractFactory("ReaderUtils", {
//     libraries: {
//         MarketStoreUtils: marketStoreUtils.address,
//         PositionStoreUtils: positionStoreUtils.address,
//         PositionUtils: "0xb57df1b8cF0e214c6afE9c9BdA9F677e6Cf2adB6",
//         ReaderPricingUtils: "0x3438755d5d889b0e877aD119b3d08E7D14b99325"
//     }
//   });
//   const readerUtils = await ReaderUtils.deploy();
//   console.log("ReaderUtils deployed to:", readerUtils.address);
// 0xee45A7c4FF559E118207a3F0e0f3A6cF7332F938

//   const ReaderWithdrawalUtils = await hre.ethers.getContractFactory("ReaderWithdrawalUtils", {
//     libraries: {
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c"
//     }
//   });
//   const readerWithdrawalUtils = await ReaderWithdrawalUtils.deploy();
//   console.log("ReaderWithdrawalUtils deployed to:", readerWithdrawalUtils.address);
// 0xAdCd4d75f11D26033b406C971fab34fd92C25eAF

//   const Reader = await hre.ethers.getContractFactory("Reader", {
//     libraries: {
//         DepositStoreUtils: depositStoreUtils.address,
//         MarketStoreUtils: marketStoreUtils.address,
//         MarketUtils: "0xb2de432405A72db360613A01F9B8913F45202B4c",
//         OrderStoreUtils: orderStoreUtils.address,
//         PositionStoreUtils: positionStoreUtils.address,
//         PositionUtils: "0xb57df1b8cF0e214c6afE9c9BdA9F677e6Cf2adB6",
//         ReaderDepositUtils: "0xd1d986C1Bf93891e15fe89778D42e3d0e47ABB99",
//         ReaderPricingUtils: "0x3438755d5d889b0e877aD119b3d08E7D14b99325",
//         ReaderUtils: "0xee45A7c4FF559E118207a3F0e0f3A6cF7332F938",
//         ReaderWithdrawalUtils: readerWithdrawalUtils.address,
//         WithdrawalStoreUtils: withdrawalStoreUtils.address
//     }
//   });
//   const reader = await Reader.deploy();
//   console.log("Reader deployed to:", reader.address);
// 0xD8476c02A21Eeb68C2e679eFFF196BF3807c7c0B

//   const SubaccountRouter = await hre.ethers.getContractFactory("SubaccountRouter", {
//     libraries: {
//         OrderStoreUtils: orderStoreUtils.address
//     }
//   });
//   const subaccountRouter = await SubaccountRouter.deploy(router.address, roleStore.address, dataStore.address, eventEmitter.address, "0x17a5755915c015bfce203De18eea9640Fb082c61", orderVault.address); //0x17a5755915c015bfce203De18eea9640Fb082c61 is orderHandler.address
//   console.log("SubaccountRouter deployed to:", subaccountRouter.address);
//   0x3eFc27a3ce5aEB736aE83a45E5DcD1fDaDA43117

//   await sendTxn(roleStore.grantRole(subaccountRouter.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))")  
//   await sendTxn(roleStore.grantRole(subaccountRouter.address, hashString("ROUTER_PLUGIN")), "roleStore.grantRole(hashString(ROUTER_PLUGIN))")  

//   const Timelock = await hre.ethers.getContractFactory("Timelock");
//   const timelock = await Timelock.deploy(roleStore.address, dataStore.address, eventEmitter.address, oracleStore.address, 24 * 60 * 60);
//   console.log("Timelock deployed to:", timelock.address);
//   0xec45BBc701604b2ab60994408398Ad298a647201

//   await sendTxn(roleStore.grantRole(timelock.address, hashString("CONTROLLER")), "roleStore.grantRole(hashString(CONTROLLER))")  
//   await sendTxn(roleStore.grantRole(timelock.address, hashString("ROLE_ADMIN")), "roleStore.grantRole(hashString(ROLE_ADMIN))")  
  
//   await sendTxn(marketFactory.createMarket(process.env.DG, process.env.DG, process.env.WMXC, process.env.MARKET_TYPE), "marketFactory.createMarket(0)")  
//   await sendTxn(marketFactory.createMarket(process.env.PARK, process.env.PARK, process.env.WMXC, process.env.MARKET_TYPE), "marketFactory.createMarket(1)")  

//   const MarketToken = await hre.ethers.getContractFactory("MarketToken");
//   const marketToken = await contractAt("MarketToken", "0x4450C15a2eCf43BE22C83b4FcF32eC6b69dCACAB")
  //   0xdcfed5ff99efb29b4125e30476c9702c3489dbfe
  //   0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa
//   0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f
//   console.log("aria hashData = ", hashData(["bytes32", "address", "bool"], [hashString(
//     "MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER"
//   ), "0x47c031236e19d024b42f8AE6780E44A573170703", true]))

//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "address"], [hashString("MAX_POOL_AMOUNT"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", process.env.WMXC]), process.env.MAX_POOL_AMOUNT), "dataStore.setUint(hashString(MAX_POOL_AMOUNT1))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "address"], [hashString("MAX_POOL_AMOUNT"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", process.env.PARK]), process.env.MAX_POOL_AMOUNT), "dataStore.setUint(hashString(MAX_POOL_AMOUNT2))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "address"], [hashString("MAX_POOL_AMOUNT"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", process.env.WMXC]), process.env.MAX_POOL_AMOUNT), "dataStore.setUint(hashString(MAX_POOL_AMOUNT3))")

//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "address"], [hashString("MAX_POOL_AMOUNT_FOR_DEPOSIT"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", process.env.DG]), process.env.MAX_POOL_AMOUNT), "dataStore.setUint(hashString(MAX_POOL_AMOUNT_FOR_DEPOSIT0))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "address"], [hashString("MAX_POOL_AMOUNT_FOR_DEPOSIT"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", process.env.WMXC]), process.env.MAX_POOL_AMOUNT), "dataStore.setUint(hashString(MAX_POOL_AMOUNT_FOR_DEPOSIT1))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "address"], [hashString("MAX_POOL_AMOUNT_FOR_DEPOSIT"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", process.env.PARK]), process.env.MAX_POOL_AMOUNT), "dataStore.setUint(hashString(MAX_POOL_AMOUNT_FOR_DEPOSIT2))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "address"], [hashString("MAX_POOL_AMOUNT_FOR_DEPOSIT"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", process.env.WMXC]), process.env.MAX_POOL_AMOUNT), "dataStore.setUint(hashString(MAX_POOL_AMOUNT_FOR_DEPOSIT3))")

  
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("MIN_COLLATERAL_FACTOR"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe"]), process.env.MIN_COLLATERAL_FACTOR), "dataStore.setUint(hashString(MIN_COLLATERAL_FACTOR))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("MIN_COLLATERAL_FACTOR"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa"]), process.env.MIN_COLLATERAL_FACTOR), "dataStore.setUint(hashString(MIN_COLLATERAL_FACTOR))")

//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", true]), process.env.MIN_COLLATERAL_FACTOR), "dataStore.setUint(hashString(MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", false]), process.env.MIN_COLLATERAL_FACTOR), "dataStore.setUint(hashString(MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", true]), process.env.MIN_COLLATERAL_FACTOR), "dataStore.setUint(hashString(MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", false]), process.env.MIN_COLLATERAL_FACTOR), "dataStore.setUint(hashString(MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER))")

//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MAX_OPEN_INTEREST"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", true]), process.env.MAX_OPEN_INTEREST), "dataStore.setUint(hashString(MAX_OPEN_INTEREST))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MAX_OPEN_INTEREST"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", false]), process.env.MAX_OPEN_INTEREST), "dataStore.setUint(hashString(MAX_OPEN_INTEREST))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MAX_OPEN_INTEREST"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", true]), process.env.MAX_OPEN_INTEREST), "dataStore.setUint(hashString(MAX_OPEN_INTEREST))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MAX_OPEN_INTEREST"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", false]), process.env.MAX_OPEN_INTEREST), "dataStore.setUint(hashString(MAX_OPEN_INTEREST))")

//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("RESERVE_FACTOR"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", true]), process.env.RESERVE_FACTOR), "dataStore.setUint(hashString(RESERVE_FACTOR))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("RESERVE_FACTOR"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", false]), process.env.RESERVE_FACTOR), "dataStore.setUint(hashString(RESERVE_FACTOR))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("RESERVE_FACTOR"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", true]), process.env.RESERVE_FACTOR), "dataStore.setUint(hashString(RESERVE_FACTOR))")
//   await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("RESERVE_FACTOR"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", false]), process.env.RESERVE_FACTOR), "dataStore.setUint(hashString(RESERVE_FACTOR))")

  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_TRADERS"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", true]), process.env.MAX_PNL_FACTOR_FOR_TRADERS), "dataStore.setUint(hashString(MAX_PNL_FACTOR))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_TRADERS"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", false]), process.env.MAX_PNL_FACTOR_FOR_TRADERS), "dataStore.setUint(hashString(MAX_PNL_FACTOR))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_TRADERS"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", true]), process.env.MAX_PNL_FACTOR_FOR_TRADERS), "dataStore.setUint(hashString(MAX_PNL_FACTOR))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_TRADERS"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", false]), process.env.MAX_PNL_FACTOR_FOR_TRADERS), "dataStore.setUint(hashString(MAX_PNL_FACTOR))")

  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_ADL"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", true]), process.env.MAX_PNL_FACTOR_FOR_ADL), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_ADL))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_ADL"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", false]), process.env.MAX_PNL_FACTOR_FOR_ADL), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_ADL))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_ADL"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", true]), process.env.MAX_PNL_FACTOR_FOR_ADL), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_ADL))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_ADL"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", false]), process.env.MAX_PNL_FACTOR_FOR_ADL), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_ADL))")
  
    await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MIN_PNL_FACTOR_AFTER_ADL"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", true]), process.env.MIN_PNL_FACTOR_AFTER_ADL), "dataStore.setUint(hashString(MIN_PNL_FACTOR_AFTER_ADL))")
    await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MIN_PNL_FACTOR_AFTER_ADL"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", false]), process.env.MIN_PNL_FACTOR_AFTER_ADL), "dataStore.setUint(hashString(MIN_PNL_FACTOR_AFTER_ADL))")
    await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MIN_PNL_FACTOR_AFTER_ADL"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", true]), process.env.MIN_PNL_FACTOR_AFTER_ADL), "dataStore.setUint(hashString(MIN_PNL_FACTOR_AFTER_ADL))")
    await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("MIN_PNL_FACTOR_AFTER_ADL"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", false]), process.env.MIN_PNL_FACTOR_AFTER_ADL), "dataStore.setUint(hashString(MIN_PNL_FACTOR_AFTER_ADL))")

  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_DEPOSITS"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", true]), process.env.MAX_PNL_FACTOR_FOR_DEPOSITS), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_DEPOSITS))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_DEPOSITS"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", false]), process.env.MAX_PNL_FACTOR_FOR_DEPOSITS), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_DEPOSITS))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_DEPOSITS"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", true]), process.env.MAX_PNL_FACTOR_FOR_DEPOSITS), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_DEPOSITS))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_DEPOSITS"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", false]), process.env.MAX_PNL_FACTOR_FOR_DEPOSITS), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_DEPOSITS))")

  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_WITHDRAWALS"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", true]), process.env.MAX_PNL_FACTOR_FOR_WITHDRAWALS), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_DEPOSITS))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_WITHDRAWALS"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe", false]), process.env.MAX_PNL_FACTOR_FOR_WITHDRAWALS), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_WITHDRAWALS))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_WITHDRAWALS"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", true]), process.env.MAX_PNL_FACTOR_FOR_WITHDRAWALS), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_WITHDRAWALS))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "bytes32", "address", "bool"], [hashString("MAX_PNL_FACTOR"), hashString("MAX_PNL_FACTOR_FOR_WITHDRAWALS"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa", false]), process.env.MAX_PNL_FACTOR_FOR_WITHDRAWALS), "dataStore.setUint(hashString(MAX_PNL_FACTOR_FOR_WITHDRAWALS))")

  await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("TOKEN_TRANSFER_GAS_LIMIT"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe"]), process.env.TOKEN_TRANSFER_GAS_LIMIT), "dataStore.setUint(hashString(TOKEN_TRANSFER_GAS_LIMIT))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("TOKEN_TRANSFER_GAS_LIMIT"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa"]), process.env.TOKEN_TRANSFER_GAS_LIMIT), "dataStore.setUint(hashString(TOKEN_TRANSFER_GAS_LIMIT))")

  await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS"), "0xdcfed5ff99efb29b4125e30476c9702c3489dbfe"]), process.env.MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS), "dataStore.setUint(hashString(MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "address"], [hashString("MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS"), "0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa"]), process.env.MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS), "dataStore.setUint(hashString(MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS))")

  await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("POSITION_IMPACT_FACTOR"), '0xdcfed5ff99efb29b4125e30476c9702c3489dbfe', true]), process.env.POSITION_IMPACT_FACTOR), "dataStore.setUint(hashString(POSITION_IMPACT_FACTOR))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("POSITION_IMPACT_FACTOR"), '0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa', true]), process.env.POSITION_IMPACT_FACTOR), "dataStore.setUint(hashString(POSITION_IMPACT_FACTOR))")

  await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("POSITION_IMPACT_FACTOR"), '0xdcfed5ff99efb29b4125e30476c9702c3489dbfe', false]), process.env.POSITION_IMPACT_FACTOR), "dataStore.setUint(hashString(POSITION_IMPACT_FACTOR))")
  await sendTxn(dataStore.setUint(hashData(["bytes32", "address", "bool"], [hashString("POSITION_IMPACT_FACTOR"), '0x44310Fd5949631EEC01282B7aaF7051fCDfEcBaa', false]), process.env.POSITION_IMPACT_FACTOR), "dataStore.setUint(hashString(POSITION_IMPACT_FACTOR))")

//   try {
//     console.log("aria verify start")
//     await hre.run("verify:verify", {
//       address: roleStore.address,
//       constructorArguments: [
//         // Constructor arguments here
//       ],
//       // Optional: if your contract uses libraries, you can also specify them here
//     });
//     console.log("aria verify end")

//   } catch (error) {
//     if (error.message.toLowerCase().includes("already verified")) {
//       console.log("Contract already verified");
//     } else {
//       console.error(error);
//     }
//   }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((ex) => {
    console.error(ex);
    process.exit(1);
  });
