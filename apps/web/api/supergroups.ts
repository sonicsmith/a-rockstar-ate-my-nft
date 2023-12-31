import Moralis from "moralis";
import { cache } from "react";
import { initMoralis } from "./initMoralis";
import { SUPERGROUPS_CONTRACT_ADDRESS } from "../app/constants";
import { SupergroupsNftItem } from "../app/types";

export const getSupergroups = cache(async () => {
  try {
    await initMoralis();

    const response = await Moralis.EvmApi.nft.getNFTOwners({
      chain: process.env.NEXT_PUBLIC_CHAIN_CODE,
      format: "decimal",
      address: SUPERGROUPS_CONTRACT_ADDRESS,
    });

    if (response.result.length === 0) {
      return [] as SupergroupsNftItem[];
    }

    const supergroups = response.result.map((token) => {
      return {
        tokenId: token.tokenId || "",
        ownerOf: token.ownerOf?.lowercase || "",
      };
    }) as SupergroupsNftItem[];

    return supergroups;
  } catch (error) {
    console.log("ERROR: ", error);
    return [];
  }
});
