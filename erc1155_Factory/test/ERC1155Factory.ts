import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

import { ERC1155Token__factory } from "../typechain";

const ZERO = BigNumber.from(0);
const ONE = BigNumber.from(1);
const TWO = BigNumber.from(2);

// ERC1155 parameters
const contractName = "location1";
const uri = "ipfs://bafybeidzotixdn4ivupmbdsp6mnostjlf6odwnsniayzff4a4qvpabbh6y";
const ids = [ ZERO, ONE ];
const names = ["noun0", "noun1"];
// params
let owner: any, user: any;

describe("Wallchain", function () {
  async function deployFactory() {
    [ owner, user ] = await ethers.getSigners();

    const owners = [owner.address, owner.address]

    const Factory = await ethers.getContractFactory("FactoryERC1155");
    const factory = await Factory.deploy();
    
    const erc1155 = await factory.deployERC1155(contractName, uri, ids, names, owners);

    return { factory, erc1155 };
  }

  describe("Deployment", function () {
    it("Should return event: rebalanced", async function () {
      const { factory, erc1155 } = await loadFixture(deployFactory);

      await expect(erc1155)
          .to.emit(factory, "ERC1155Created")
    });

    it("Should set the index to the contract owner", async function () {
      const { factory, erc1155 } = await loadFixture(deployFactory);

      expect(await factory.indexToOwner(ZERO)).to.equal(owner.address);
    });

    it("Should set the erc1155 params", async function () {
      const { factory } = await loadFixture(deployFactory);

      const erc1155Addr = await factory.indexToContract(ZERO);

      const erc1155 = ERC1155Token__factory.connect(erc1155Addr, owner)
      
      expect(await erc1155.name()).to.equal(contractName);
      expect(await erc1155.uri(ZERO)).to.equal(uri+"/metadata/"+ids[0]+".json");
      expect(await erc1155.ids(ZERO)).to.equal(ids[0]);
      expect(await erc1155.names(ZERO)).to.equal(names[0]);

      expect(await erc1155.uri(ONE)).to.equal(uri+"/metadata/"+ids[1]+".json");
      expect(await erc1155.ids(ONE)).to.equal(ids[1]);
      expect(await erc1155.names(ONE)).to.equal(names[1]);
    });

    it("Should add a new type (2) to the token", async function () {
      
      const { factory } = await loadFixture(deployFactory);

      await factory.addTypeToERC1155(ZERO, "noun2", TWO, owner.address);

      expect(await factory.getERC1155TypesLength(ZERO)).to.equal(BigNumber.from(3));
    });
  });

  describe("Owner mints", function () {

    async function deployFactory() {
      [ owner, user ] = await ethers.getSigners();

      const owners = [owner.address, owner.address]
    
      const Factory = await ethers.getContractFactory("FactoryERC1155");
      const factory = await Factory.deploy();
      
      await factory.deployERC1155(contractName, uri, ids, names, owners);
      const erc1155Addr = await factory.indexToContract(ZERO);
      const erc1155 = ERC1155Token__factory.connect(erc1155Addr, owner)

      return { factory, erc1155 };
    }

    it("Should mint one nft of type 0 to the owner wallet", async function () {
      
      const { factory, erc1155 } = await loadFixture(deployFactory);

      await factory.mintERC1155(ZERO, names[0]);

      expect(await erc1155.balanceOf(owner.address, ZERO)).to.equal(ONE);
    });

    it("Should fail to mint one nft of type 0 to the owner wallet", async function () {
      
      const { factory } = await loadFixture(deployFactory);

      await factory.mintERC1155(ZERO, names[0]);

      await expect(factory.mintERC1155(ZERO, names[0])).to.be.revertedWith("Circulating supply is already 1");
    });
  });

    describe("User", function () {
      async function deployContracts() {
        [ owner, user ] = await ethers.getSigners();

        const owners = [owner.address, owner.address]
      
        const Factory = await ethers.getContractFactory("FactoryERC1155");
        const factory = await Factory.deploy();
        
        await factory.deployERC1155(contractName, uri, ids, names, owners);
        const erc1155Addr = await factory.indexToContract(ZERO);
        const erc1155 = ERC1155Token__factory.connect(erc1155Addr, owner);

        await factory.mintERC1155(ZERO, names[1]);
  
        return { factory, erc1155 };
      }
      it("Should fetch the nft of type 1", async function () {
        const { factory, erc1155 } = await loadFixture(deployContracts);

        const {_contract, _owner, _uri, supply} = await factory.getERC1155byIndexAndId(ZERO, ONE);

        await expect(_contract).to.equal(erc1155.address, "Wrong contract address");
        await expect(_owner).to.equal(factory.address, "Wrong owner address");
        await expect(_uri).to.equal(uri+"/metadata/"+ids[1]+".json", "Wrong uri");
        await expect(supply).to.equal(ONE, "Wrong supply");

      });
    });
});
