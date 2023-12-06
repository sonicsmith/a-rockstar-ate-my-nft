import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import type { Artist } from "../types";
import { useSpotifyToken } from "./useSpotifyToken";

const getArtistQuery = ({
  query,
  token,
}: {
  query: string;
  token: string | null;
}) => {
  if (token && query) {
    return axios
      .get(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  } 
    return [];
  
};

export const useArtistSearch = (query: string) => {
  const [lastSuggestedArtist, setLastSuggestedArtist] = useState<Artist | null>(
    null,
  );
  const [newQuery, setNewQuery] = useState("");

  const token = useSpotifyToken();

  // Only update new query if it's different
  // from the current suggested artist
  useEffect(() => {
    const lastArtistName = lastSuggestedArtist?.name ?? "";
    const suggestArtistBit = lastArtistName.slice(0, query.length);
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
      if (firstArtist) {
        const { name, id, images, followers } = firstArtist;
        const { total } = followers;
        setLastSuggestedArtist({
          name,
          id,
          imageUrl: images[2].url,
          totalFollowers: total,
        });
      } else {
        setLastSuggestedArtist(null);
      }
    }
  }, [data]);

  return query ? lastSuggestedArtist : null;
};
