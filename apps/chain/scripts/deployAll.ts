import { network, viem } from "hardhat";

// npx

async function main() {
  const isTestnet = network.name === "mumbai";

  console.log("Running script on", isTestnet ? "Testnet" : "Polygon Mainnet");
  console.log("");

  // Deploy Main Contract
  const aRockstarAteMyNFTInstance = await viem.deployContract(
    "ARockstarAteMyNFT",
    [],
  );
  console.log("ARockstarAteMyNFT address:", aRockstarAteMyNFTInstance.address);

  // Deploy NFT
  const supergroupsInstance = await viem.deployContract("Supergroups", [
    aRockstarAteMyNFTInstance.address,
  ]);
  console.log("Supergroups address:", supergroupsInstance.address);

  // Deploy ERC20
  const royaltiesInstance = await viem.deployContract("Royalties", [
    aRockstarAteMyNFTInstance.address,
  ]);
  console.log("Royalties address:", royaltiesInstance.address);

  // Setup Main Contract with NFT and ERC20
  const publicClient = await viem.getPublicClient();
  const supergroupsAddress = supergroupsInstance.address as `0x${string}`;
  let hash = await aRockstarAteMyNFTInstance.write.setSupergroupsAddress([
    supergroupsAddress,
  ]);
  await publicClient.waitForTransactionReceipt({ hash });
  const royaltiesAddress = royaltiesInstance.address as `0x${string}`;
  hash = await aRockstarAteMyNFTInstance.write.setRoyaltiesAddress([
    royaltiesAddress,
  ]);
  await publicClient.waitForTransactionReceipt({ hash });

  console.log("Setup Main Contract with NFT and ERC20");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
