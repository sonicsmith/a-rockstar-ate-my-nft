import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSpotifyToken } from "./useSpotifyToken";
import { useEffect, useMemo, useState } from "react";

const getArtistQuery = ({ query, token }: { query: string; token: string }) => {
  if (token && query) {
    return axios
      .get(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  } else {
    return [];
  }
};

export const useArtistSearch = (query: string): string => {
  const [lastSuggestedArtist, setLastSuggestedArtist] = useState("");
  const [newQuery, setNewQuery] = useState("");

  const token = useSpotifyToken();

  // Only update new query if it's different
  // from the current suggested artist
  useEffect(() => {
    const suggestArtistBit = lastSuggestedArtist.slice(0, query.length);
    if (query !== suggestArtistBit) {
      setNewQuery(query);
    }
  }, [query]);

  const { isPending, error, data, isFetching } = useQuery({
    // Query key here is newQuery, not query
    queryKey: ["artistNames", newQuery, token],
    queryFn: () => getArtistQuery({ query: newQuery, token }),
  });

  useEffect(() => {
    if (data?.artists?.items) {
      const firstArtist = data?.artists?.items[0];
      setLastSuggestedArtist(firstArtist?.name || "");
    }
  }, [data]);

  return lastSuggestedArtist;
};
