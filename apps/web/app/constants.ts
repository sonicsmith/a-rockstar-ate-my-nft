import mainArtifacts from "./../app/abis/ARockstarAteMyNFT.json";
import supergroupsArtifacts from "./../app/abis/Supergroups.json";
import royaltiesArtifacts from "./../app/abis/Royalties.json";

export const MAIN_CONTRACT_ADDRESS: `0x${string}` =
  "0xf5687670b9c00abba0caa5eae2ede6877715bd89";

export const SUPERGROUPS_CONTRACT_ADDRESS: `0x${string}` =
  "0x9b8a99ae0e8bd975abd2a5d37bb46b15c5e82cfe";

export const ROYALTIES_CONTRACT_ADDRESS: `0x${string}` =
  "0xfeca7ada38e9566526bb3947796e5d7ba541a592";

export const MAIN_CONTRACT_ABI = mainArtifacts.abi;

export const SUPERGROUPS_CONTRACT_ABI = supergroupsArtifacts.abi;

export const ROYALTIES_CONTRACT_ABI = royaltiesArtifacts.abi;
