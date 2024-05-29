import { setBoolIfDifferent } from "../../utils/dataStore";
import * as keys from "../../utils/keys";

const func = async () => {
  await setBoolIfDifferent(
    keys.isMarketDisabledKey("0xbE5Cd24390Ab2F3bd56cC078AbE2b662081aBdFd"),
    true,
    "disable TEST market"
  );

  await setBoolIfDifferent(
    keys.isMarketDisabledKey("0xEDe073e6B1b0fa1fB6Fa4274944822a869c90Fc9"),
    true,
    "disable TEST market"
  );

  return true;
};

func.tags = ["DisableOldTestMarketOnAvalancheFuji"];
func.id = "DisableOldTestMarketOnAvalancheFuji";
func.dependencies = ["DataStore"];
func.skip = ({ network }) => {
  return network.name !== "fuji";
};

export default func;
