import { ethers } from "hardhat";

async function main() {
  // Deploy MemeVest token
  const MemeVest = await ethers.getContractFactory("MemeVest");
  const memeVest = await MemeVest.deploy();
  await memeVest.deployed();
  console.log("MemeVest deployed to:", memeVest.address);

  // Deploy MultiAssetReceiver
  const MultiAssetReceiver = await ethers.getContractFactory("MultiAssetReceiver");
  const multiAssetReceiver = await MultiAssetReceiver.deploy();
  await multiAssetReceiver.deployed();
  console.log("MultiAssetReceiver deployed to:", multiAssetReceiver.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
