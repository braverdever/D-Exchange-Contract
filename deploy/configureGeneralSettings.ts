import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as keys from "../utils/keys";
import { setAddressIfDifferent, setUintIfDifferent, setBoolIfDifferent } from "../utils/dataStore";
import { getMarketTokenAddresses, getMarketKey, getOnchainMarkets } from "../utils/market";

const func = async ({ gmx, deployments }: HardhatRuntimeEnvironment) => {
  const { execute, get, read, log } = deployments;
  const generalConfig = await gmx.getGeneral();
  // console.log("aria generalConfig = ", generalConfig)
  // const tokens = await gmx.getTokens();
  // const markets = await gmx.getMarkets();

  // // console.log("aria tokens = ", tokens)
  // const dataStore = await get("DataStore");
  // let onchainMarketsByTokens = await getOnchainMarkets(read, dataStore.address);
  // for (const marketConfig of markets) {
  //   const [indexToken, longToken, shortToken] = getMarketTokenAddresses(marketConfig, tokens);
  //   console.log("aria marketConfig = ", marketConfig)
  //   console.log("aria indexToken = ", indexToken)
  //   console.log("aria longToken = ", longToken)
  //   console.log("aria shortToken = ", shortToken)

  //   const marketKey = getMarketKey(indexToken, longToken, shortToken);
  //   const onchainMarket = onchainMarketsByTokens[marketKey];
  //   const marketToken = onchainMarket.marketToken;
  //   console.log("aria marketConfig = ", marketToken)
  // }

  await setAddressIfDifferent(keys.FEE_RECEIVER, generalConfig.feeReceiver, "fee receiver");
  await setAddressIfDifferent(keys.HOLDING_ADDRESS, generalConfig.holdingAddress, "holding address");
  await setUintIfDifferent(keys.MAX_UI_FEE_FACTOR, generalConfig.maxUiFeeFactor, "maxUiFeeFactor");

  await setUintIfDifferent(
    keys.MIN_HANDLE_EXECUTION_ERROR_GAS,
    generalConfig.minHandleExecutionErrorGas,
    "minHandleExecutionErrorGas"
  );

  await setUintIfDifferent(
    keys.MIN_HANDLE_EXECUTION_ERROR_GAS_TO_FORWARD,
    generalConfig.minHandleExecutionErrorGasToForward,
    "minHandleExecutionErrorGasToForward"
  );

  await setUintIfDifferent(
    keys.MIN_ADDITIONAL_GAS_FOR_EXECUTION,
    generalConfig.minAdditionalGasForExecution,
    "minAdditionalGasForExecution"
  );

  await setUintIfDifferent(keys.MAX_CALLBACK_GAS_LIMIT, generalConfig.maxCallbackGasLimit, "max callback gas limit");
  await setUintIfDifferent(keys.MAX_SWAP_PATH_LENGTH, generalConfig.maxSwapPathLength, "max swap path length");

  await setUintIfDifferent(keys.MIN_COLLATERAL_USD, generalConfig.minCollateralUsd, "min collateral USD");
  await setUintIfDifferent(keys.MIN_POSITION_SIZE_USD, generalConfig.minPositionSizeUsd, "min position size USD");

  await setUintIfDifferent(keys.SWAP_FEE_RECEIVER_FACTOR, generalConfig.swapFeeReceiverFactor, "swapFeeReceiverFactor");

  await setUintIfDifferent(
    keys.POSITION_FEE_RECEIVER_FACTOR,
    generalConfig.positionFeeReceiverFactor,
    "positionFeeReceiverFactor"
  );

  await setUintIfDifferent(
    keys.BORROWING_FEE_RECEIVER_FACTOR,
    generalConfig.borrowingFeeReceiverFactor,
    "borrowingFeeReceiverFactor"
  );

  await setUintIfDifferent(
    keys.CLAIMABLE_COLLATERAL_TIME_DIVISOR,
    generalConfig.claimableCollateralTimeDivisor,
    "claimable collateral time divisor"
  );

  await setUintIfDifferent(
    keys.depositGasLimitKey(true),
    generalConfig.depositGasLimitSingle,
    "deposit gas limit single"
  );

  await setUintIfDifferent(
    keys.depositGasLimitKey(false),
    generalConfig.depositGasLimitMultiple,
    "deposit gas limit multiple"
  );

  await setUintIfDifferent(keys.withdrawalGasLimitKey(), generalConfig.withdrawalGasLimit, "withdrawal gas limit");

  await setUintIfDifferent(keys.singleSwapGasLimitKey(), generalConfig.singleSwapGasLimit, "single swap gas limit");

  await setUintIfDifferent(
    keys.increaseOrderGasLimitKey(),
    generalConfig.increaseOrderGasLimit,
    "increase order gas limit"
  );

  await setUintIfDifferent(
    keys.decreaseOrderGasLimitKey(),
    generalConfig.decreaseOrderGasLimit,
    "decrease order gas limit"
  );

  await setUintIfDifferent(keys.swapOrderGasLimitKey(), generalConfig.swapOrderGasLimit, "swap order gas limit");

  await setUintIfDifferent(
    keys.NATIVE_TOKEN_TRANSFER_GAS_LIMIT,
    generalConfig.nativeTokenTransferGasLimit,
    "native token transfer gas limit"
  );

  await setUintIfDifferent(
    keys.ESTIMATED_GAS_FEE_BASE_AMOUNT,
    generalConfig.estimatedGasFeeBaseAmount,
    "estimated gas fee base amount"
  );

  await setUintIfDifferent(
    keys.ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR,
    generalConfig.estimatedGasFeeMultiplierFactor,
    "estimated gas fee multiplier factor"
  );

  await setUintIfDifferent(
    keys.EXECUTION_GAS_FEE_BASE_AMOUNT,
    generalConfig.executionGasFeeBaseAmount,
    "execution gas fee base amount"
  );

  await setUintIfDifferent(
    keys.EXECUTION_GAS_FEE_MULTIPLIER_FACTOR,
    generalConfig.executionGasFeeMultiplierFactor,
    "execution gas fee multiplier factor"
  );

  await setBoolIfDifferent(
    keys.SKIP_BORROWING_FEE_FOR_SMALLER_SIDE,
    generalConfig.skipBorrowingFeeForSmallerSide,
    "skip borrowing fee for smaller side"
  );

  if (generalConfig.requestExpirationBlockAge !== undefined) {
    await setUintIfDifferent(
      keys.REQUEST_EXPIRATION_BLOCK_AGE,
      generalConfig.requestExpirationBlockAge,
      "request expiration block age"
    );
  }
};

func.tags = ["GeneralSettings"];
func.dependencies = ["DataStore"];
export default func;
