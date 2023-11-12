import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getToken = () => {
  return axios.get(`/api/token`, {}).then((res) => res.data);
};

export const useSpotifyToken = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["spotifyToken"],
    queryFn: () => getToken(),
  });

  return data?.accessToken || null;
};
