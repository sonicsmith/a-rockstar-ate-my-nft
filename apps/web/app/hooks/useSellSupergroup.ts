import { useContractWrite } from "wagmi";
import { MAIN_CONTRACT_ABI, MAIN_CONTRACT_ADDRESS } from "../constants";
import axios from "axios";

export const useSellSupergroup = (tokenId: string) => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: MAIN_CONTRACT_ADDRESS,
    abi: MAIN_CONTRACT_ABI,
    functionName: "sellSupergroup",
  });

  const sellSupergroup = async () => {
    const tokenResponse = await axios.get(`/api/token`).then((res) => res.data);
    const { accessToken } = tokenResponse;
    if (!accessToken) {
      throw new Error("No access token");
    }
    write({ args: [accessToken, tokenId] });
  };

  return { data, isLoading, isSuccess, sellSupergroup };
};
