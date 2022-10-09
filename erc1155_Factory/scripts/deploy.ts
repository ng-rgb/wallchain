import { ethers } from "hardhat";

async function main() {

  const FactoryERC1155 = await ethers.getContractFactory("FactoryERC1155");
  const factoryERC1155 = await FactoryERC1155.deploy();

  await factoryERC1155.deployed();

  console.log(`factoryERC1155 deployed to ${factoryERC1155.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
