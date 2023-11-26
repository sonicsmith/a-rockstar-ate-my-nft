import { useContractRead } from "wagmi";

import { useArtistsInfo } from "./useArtistsInfo";

export const useSupergroupInfo = (supergroupId: string) => {
  //   const {} = useContractRead();//SUPERGROUPS_CONTRACT_ADDRESS

  const artistIds = ["", ""];

  const [artist1Info, artist2Info] = useArtistsInfo(artistIds || []);

  return {
    artists: [artist1Info, artist2Info],
    creationNumberOfFollowers: 1000,
    currentNumberOfFollowers: 1050,
  };
};
