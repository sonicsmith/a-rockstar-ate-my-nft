import { useContractWrite } from "wagmi";
import { MAIN_CONTRACT_ABI, MAIN_CONTRACT_ADDRESS } from "../constants";

export const useSellSupergroup = () => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: MAIN_CONTRACT_ADDRESS,
    abi: MAIN_CONTRACT_ABI,
    functionName: "createSupergroup",
  });

  return;
};
