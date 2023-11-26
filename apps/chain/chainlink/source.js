// const { client_id, client_secret } = secrets;
// const basicAuth = new Buffer.from(`${client_id}:${client_secret}`).toString(
//   "base64",
// );

// // Get Access Token
// const tokenRequest = await Functions.makeHttpRequest({
//   url: `https://accounts.spotify.com/api/token`,
//   method: "POST",
//   data: "grant_type=client_credentials",
//   headers: {
//     Authorization: `Basic ${basicAuth}`,
//   },
// });
// if (tokenRequest.error) {
//   throw Error("Request failed");
// }

// const { access_token } = tokenRequest.data;

const access_token = args[0];
const artistIds = [args[1], args[2]];

let totalFollowers = 0;
for (let artistIndex = 0; artistIndex < 2; artistIndex++) {
  const artistId = artistIds[artistIndex];
  const artist = await Functions.makeHttpRequest({
    url: `https://api.spotify.com/v1/artists/${artistId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (artist.error) {
    throw Error("Request failed");
  }
  totalFollowers += artist.data.followers.total;
}

return Functions.encodeInt256(totalFollowers);
