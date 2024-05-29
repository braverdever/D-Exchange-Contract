import { handleDeposit } from './xodex-smartcontract/utils/deposit';

// Define your fixture and overrides objects
let fixture = {
  // Fill this object with the required properties
};

let overrides = {
  create: {
    // Fill this object with the required properties for the createDeposit function
  },
  execute: {
    // Fill this object with the required properties for the executeDeposit function
  }
};

// Call the function
handleDeposit(fixture, overrides)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
