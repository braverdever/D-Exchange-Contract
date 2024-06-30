import { HardhatRuntimeEnvironment } from "hardhat/types";
import { decimalToFloat, percentageToFloat, expandDecimals } from "../utils/math";
import { ethers } from "ethers";

export default async function ({ network }: HardhatRuntimeEnvironment) {
  if (network.name === "hardhat") {
    // Note that this is only for the hardhat config
    return {
      feeReceiver: ethers.constants.AddressZero,
      holdingAddress: ethers.constants.AddressZero,
      maxUiFeeFactor: decimalToFloat(5, 5), // 0.005%
      minHandleExecutionErrorGas: 1_200_000,
      minHandleExecutionErrorGasToForward: 1_000_000,
      minAdditionalGasForExecution: 1_000_000,

      depositGasLimitSingle: 0,
      depositGasLimitMultiple: 0,
      withdrawalGasLimit: 0,

      singleSwapGasLimit: 0,
      increaseOrderGasLimit: 0,
      decreaseOrderGasLimit: 0,
      swapOrderGasLimit: 0,

      tokenTransferGasLimit: 200_000,
      nativeTokenTransferGasLimit: 50_000,

      estimatedGasFeeBaseAmount: 0,
      estimatedGasFeeMultiplierFactor: 0,

      executionGasFeeBaseAmount: 0,
      executionGasFeeMultiplierFactor: 0,

      maxSwapPathLength: 5,
      maxCallbackGasLimit: 2_000_000,
      minCollateralUsd: decimalToFloat(1),

      minPositionSizeUsd: decimalToFloat(1),
      claimableCollateralTimeDivisor: 60 * 60,

      positionFeeReceiverFactor: 0,
      swapFeeReceiverFactor: 0,
      borrowingFeeReceiverFactor: 0,

      skipBorrowingFeeForSmallerSide: false,
    };
  }

  // TODO. set config
  const generalConfig = {
    feeReceiver: "0xD63757Be5CdbE85172Fd03d5d52ce01Cba8e6bCe", // what is it?
    holdingAddress: "0x8d18D763c2676e29E75327324Af16235d660acE9", // what is it?
    maxUiFeeFactor: 0, // 0.0005, 0.05%. what is it?
    minHandleExecutionErrorGas: 0,
    minHandleExecutionErrorGasToForward: 0, // measured gas required for an order cancellation: ~600,000
    minAdditionalGasForExecution: 0,

    depositGasLimitSingle: 0,
    depositGasLimitMultiple: 0,
    withdrawalGasLimit: 0,

    singleSwapGasLimit: 0, // measured gas required for a swap in a market increase order: ~600,000
    increaseOrderGasLimit: 0,
    decreaseOrderGasLimit: 0,
    swapOrderGasLimit: 0,

    tokenTransferGasLimit: 0,
    nativeTokenTransferGasLimit: 0,

    estimatedGasFeeBaseAmount: 0, // measured gas for an order execution without any main logic: ~500,000
    estimatedGasFeeMultiplierFactor: 0, // 1.25x

    executionGasFeeBaseAmount: 0, // measured gas for an order execution without any main logic: ~500,000
    executionGasFeeMultiplierFactor: 0, // 1.25x

    maxSwapPathLength: 3,
    maxCallbackGasLimit: 0,
    minCollateralUsd: 0,

    minPositionSizeUsd: 0,
    claimableCollateralTimeDivisor: 60 * 60,

    positionFeeReceiverFactor: decimalToFloat(37, 2), // 37%
    swapFeeReceiverFactor: decimalToFloat(37, 2), // 37%
    borrowingFeeReceiverFactor: decimalToFloat(37, 2), // 37%

    skipBorrowingFeeForSmallerSide: true,
  };

  const commonNetworkConfig = {
    requestExpirationBlockAge: 300, // about 5 minutes assuming 1 block per 1 seconds
    // estimatedGasFeeBaseAmount: 1_000_000,
    // executionGasFeeBaseAmount: 1_000_000,
  };

  const networkConfig = {
    arbitrumGoerli: {
      requestExpirationBlockAge: 1200, // about 5 minutes assuming 4 blocks per second
    },
    avalancheFuji: {
      requestExpirationBlockAge: 150, // about 5 minutes assuming 1 block per 2 seconds
    },
    arbitrum: {
      requestExpirationBlockAge: 1200, // about 5 minutes assuming 4 blocks per second
      estimatedGasFeeBaseAmount: 6_000_000,
      executionGasFeeBaseAmount: 6_000_000,
    },
    avalanche: {
      requestExpirationBlockAge: 150, // about 5 minutes assuming 1 block per 2 seconds
      estimatedGasFeeBaseAmount: 1_500_000,
      executionGasFeeBaseAmount: 1_500_000,
    },
    wannsee: {
      requestExpirationBlockAge: 25, // about 5 minutes assuming 1 block per 12 seconds
      estimatedGasFeeBaseAmount: 1_000_000,
      executionGasFeeBaseAmount: 1_000_000,
    },
    xodex: commonNetworkConfig,
    tenderly: commonNetworkConfig,
    testnet: commonNetworkConfig
  }[network.name];

  if (!networkConfig) {
    throw new Error(`Network config not defined for ${network.name}`);
  }

  return { ...generalConfig, ...networkConfig };
}
