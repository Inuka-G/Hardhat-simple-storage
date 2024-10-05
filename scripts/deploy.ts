import { ethers, network, run } from "hardhat";

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const SimpleStorageContract = await SimpleStorageFactory.deploy();
  await SimpleStorageContract.deploymentTransaction()!.wait(6);
  console.log("SimpleStorage deployed to:");
  console.log(network.config);
  if (network.config.chainId !== 31337) {
    await SimpleStorageContract.deploymentTransaction()!.wait(6);
    await verify(SimpleStorageContract.target, []);
  }

  // interact with the contract
  const value = await SimpleStorageContract.retrieve();
  const newValueTransaction = await SimpleStorageContract.store("7");
  await newValueTransaction.wait(6);
  console.log(" NEW Stored value:", value.toString());
};

const verify = async (contractAddress: any, args: any) => {
  // args for contract constructor
  console.log("Verifying contract at address:", contractAddress);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.includes("Contract source code already verified")) {
      console.log("Contract already verified");
    } else {
      console.log(e);
    }
  }
};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
