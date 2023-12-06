import { useAccount, useContractRead } from "wagmi";
import {
  ROYALTIES_CONTRACT_ABI,
  ROYALTIES_CONTRACT_ADDRESS,
} from "../constants";

export const useRoyaltiesBalance = () => {
  const { address } = useAccount();

  const { data, isError, isLoading } = useContractRead({
    address: ROYALTIES_CONTRACT_ADDRESS,
    abi: ROYALTIES_CONTRACT_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  return data as bigint | undefined;
};
