import { useContractWrite } from "wagmi";
import { MAIN_CONTRACT_ABI, MAIN_CONTRACT_ADDRESS } from "../constants";
import axios from "axios";

export const useCreateSupergroup = () => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: MAIN_CONTRACT_ADDRESS,
    abi: MAIN_CONTRACT_ABI,
    functionName: "createSupergroup",
  });

  const createSupergroup = async (artistIds: string[]) => {
    const tokenResponse = await axios.get(`/api/token`).then((res) => res.data);
    const { accessToken } = tokenResponse;
    if (!accessToken) {
      throw new Error("No access token");
    }
    write({ args: [[accessToken, ...artistIds]] });
  };

  return { data, isLoading, isSuccess, createSupergroup };
};
