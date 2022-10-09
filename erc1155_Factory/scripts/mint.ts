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

  let tx = await factory.deployERC1155(contractName, uri, ids, names, owners);
  await waitForTransaction(ethers.provider, tx);
  const erc1155Addr = await factory.indexToContract(ZERO);
  const erc1155 = ERC1155Token__factory.connect(erc1155Addr, owner);
  console.log(`ERC1155 ${contractName} deployed to ${erc1155.address}`);

  tx = await factory.mintERC1155(ZERO, names[0]);
  waitForTransaction(ethers.provider, tx);
  console.log(`ERC1155 ${names[0]} minted to ${owner.address}`);

  tx = await factory.mintERC1155(ZERO, names[1]);
  waitForTransaction(ethers.provider, tx);
  console.log(`ERC1155 ${names[1]} minted to ${owner.address}`);

  tx = await factory.mintERC1155(ZERO, names[2]);
  waitForTransaction(ethers.provider, tx);
  console.log(`ERC1155 ${names[2]} minted to ${owner.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function waitForTransaction(provider:any, tx:any){
  let finished = false;
  const result = await Promise.race([
      tx.wait(),
      (async () => {
          while (!finished) {
              await delay(3000);
              const mempoolTx = await provider.getTransaction(tx.hash);
              if (!mempoolTx){
                  return null;
              } 
          }
      })()
  ]);
  finished = true;
  if (!result){
      throw `Transaction ${tx.hash} failed`;
  }
  return result;
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
