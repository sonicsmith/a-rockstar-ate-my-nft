import axios from "axios";

export const getArtistInfo = ({
  artistId,
  token,
}: {
  artistId: string;
  token: string;
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
