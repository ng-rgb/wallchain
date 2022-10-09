import { ethers } from "hardhat";
import { ERC1155Token__factory, FactoryERC1155__factory } from "../typechain";
import { BigNumber } from "ethers";

async function main() {

  const ZERO = BigNumber.from(0);
  const ONE = BigNumber.from(1);
  const TWO = BigNumber.from(2);

  const contractName = "Agoria_EthBogota";
  const uri = "ipfs://bafybeidzotixdn4ivupmbdsp6mnostjlf6odwnsniayzff4a4qvpabbh6y";
  const ids = [ ZERO, ONE, TWO ];
  const names = ["noun1", "noun2", "noun3"];

  const [ owner ] = await ethers.getSigners();
  const owners = [owner.address, owner.address, owner.address];

  const factoryAddr = "0x0C956A9cC36d15A31D37a097150657EebFe1eb59";
  const factory = FactoryERC1155__factory.connect(factoryAddr, owner);

  const {_contract, _owner, _uri, supply} = await factory.getERC1155byIndexAndId(ZERO, ONE); 
  console.log(_uri);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});