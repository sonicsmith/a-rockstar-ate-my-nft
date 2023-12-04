import { useContractRead } from "wagmi";

import { useArtistInfo } from "./useArtistInfo";
import {
  SUPERGROUPS_CONTRACT_ABI,
  SUPERGROUPS_CONTRACT_ADDRESS,
} from "../constants";

interface SupergroupInfo {
  artistIds: string[];
  numberOfFollowers: BigInt;
}

export const useSupergroupInfo = (supergroupId: string) => {
  const { data, isError, isLoading } = useContractRead({
    address: SUPERGROUPS_CONTRACT_ADDRESS,
    abi: SUPERGROUPS_CONTRACT_ABI,
    functionName: "getSupergroupInfo",
    args: [supergroupId],
  });

  const {
    data: owner,
    isError: isErrorOwner,
    isLoading: isLoadingOwner,
  } = useContractRead({
    address: SUPERGROUPS_CONTRACT_ADDRESS,
    abi: SUPERGROUPS_CONTRACT_ABI,
    functionName: "ownerOf",
    args: [supergroupId],
  });

  const supergroupInfo = data as SupergroupInfo | null;
  const artistId1 = supergroupInfo?.artistIds[0];
  const artistId2 = supergroupInfo?.artistIds[1];
  const numberOfFollowers = supergroupInfo?.numberOfFollowers;

  const artist1 = useArtistInfo(artistId1);
  const artist2 = useArtistInfo(artistId2);

  if (!artist1 || !artist2) {
    return {
      owner: "",
      artists: [],
      numberOfFollowersStart: 0,
      numberOfFollowersCurrent: 0,
    };
  }

  return {
    owner: owner as string,
    artists: [artist1, artist2],
    numberOfFollowersStart: numberOfFollowers,
    numberOfFollowersCurrent: artist1.totalFollowers + artist2.totalFollowers,
  };
};
