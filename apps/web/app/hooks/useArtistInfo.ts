import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSpotifyToken } from "./useSpotifyToken";
import { useEffect, useState } from "react";
import { Artist } from "../types";

const getArtistFromId = ({
  artistId,
  token,
}: {
  artistId: string | undefined;
  token: string | null;
}) => {
  if (token && artistId) {
    return axios
      .get(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  } else {
    return null;
  }
};

export const useArtistInfo = (artistId: string | undefined) => {
  const [artist, setArtist] = useState<Artist | null>(null);

  const token = useSpotifyToken();

  const { isPending, error, data, isFetching } = useQuery({
    // Query key here is newQuery, not query
    queryKey: ["artistInfo", artistId, token],
    queryFn: () => getArtistFromId({ artistId, token }),
  });

  useEffect(() => {
    if (data?.id) {
      const { name, id, images, followers } = data;
      const { total } = followers;
      setArtist({ name, id, imageUrl: images[2].url, totalFollowers: total });
    } else {
      setArtist(null);
    }
  }, [data]);

  return artist;
};
