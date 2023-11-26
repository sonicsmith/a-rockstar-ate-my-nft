import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSpotifyToken } from "./useSpotifyToken";
import { useEffect, useState } from "react";
import { Artist } from "../types";

const getArtistFromId = ({
  artistId,
  token,
}: {
  artistId: string;
  token: string | null;
}) => {
  if (token && artistId) {
    return axios
      .get(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  } else {
    return [];
  }
};

export const useArtistsInfo = (artistIds: string[]) => {
  const [artist1, setArtist1] = useState<Artist | null>(null);
  const [artist2, setArtist2] = useState<Artist | null>(null);

  const token = useSpotifyToken();

  const {
    isPending: isArtist1Pending,
    error: isArtist1Error,
    data: artist1Data,
    isFetching: isArtist1Fetching,
  } = useQuery({
    // Query key here is newQuery, not query
    queryKey: ["artist1Info", artistIds[0], token],
    queryFn: () => getArtistFromId({ artistId: artistIds[0], token }),
  });

  const {
    isPending: isArtist2Pending,
    error: isArtist2Error,
    data: artist2Data,
    isFetching: isArtist2Fetching,
  } = useQuery({
    // Query key here is newQuery, not query
    queryKey: ["artist2Info", artistIds[1], token],
    queryFn: () => getArtistFromId({ artistId: artistIds[1], token }),
  });

  useEffect(() => {
    if (artist1Data?.artists?.items) {
      const firstArtist = artist1Data?.artists?.items[0];
      if (firstArtist) {
        const { name, id, images } = firstArtist;
        setArtist1({ name, id, imageUrl: images[2].url });
      } else {
        setArtist1(null);
      }
    }
  }, [artist1Data]);

  useEffect(() => {
    if (artist2Data?.artists?.items) {
      const firstArtist = artist2Data?.artists?.items[0];
      if (firstArtist) {
        const { name, id, images } = firstArtist;
        setArtist2({ name, id, imageUrl: images[2].url });
      } else {
        setArtist2(null);
      }
    }
  }, [artist2Data]);

  return [artist1, artist2];
};
