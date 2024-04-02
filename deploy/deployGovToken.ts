import { createDeployFunction } from "../utils/deploy";

const func = createDeployFunction({
  contractName: "GovToken",
  id: "GovToken_1",
  dependencyNames: ["RoleStore"],
  getDeployArgs: async ({ dependencyContracts }) => {
    return [
      dependencyContracts.RoleStore.address, // roleStore
      "XODEX DAO", // name
      "XODEX_DAO", // symbol
      18, // decimals
    ];
  },
});

export default func;
