import mainArtifacts from "./../app/abis/ARockstarAteMyNFT.json";
import supergroupsArtifacts from "./../app/abis/Supergroups.json";
import royaltiesArtifacts from "./../app/abis/Royalties.json";

export const MAIN_CONTRACT_ADDRESS: `0x${string}` =
  "0xa29d09e3907a268e3442c9a0ecca354111f34e53";

export const SUPERGROUPS_CONTRACT_ADDRESS: `0x${string}` =
  "0x32fb2932dcfcd81266dd774efdcef1ceb2f7f135";

export const ROYALTIES_CONTRACT_ADDRESS: `0x${string}` =
  "0x1a2cca34bca1c2121bc92d58c77cb32cb7bc7172";

export const MAIN_CONTRACT_ABI = mainArtifacts.abi;

export const SUPERGROUPS_CONTRACT_ABI = supergroupsArtifacts.abi;

export const ROYALTIES_CONTRACT_ABI = royaltiesArtifacts.abi;
