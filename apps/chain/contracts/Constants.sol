// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

string constant _javascriptSource = "const access_token = args[0];"
"const artistIds = [args[1], args[2]];"
"let totalFollowers = 0;"
"for (let artistIndex = 0; artistIndex < 2; artistIndex++) {"
"  const artistId = artistIds[artistIndex];"
"  const artist = await Functions.makeHttpRequest({"
"    url: `https://api.spotify.com/v1/artists/${artistId}`,"
"    method: 'GET',"
"    headers: {"
"      'Content-Type': 'application/x-www-form-urlencoded',"
"      Authorization: `Bearer ${access_token}`,"
"    },"
"  });"
"  if (artist.error) {"
"    throw Error('Request failed');"
"  }"
"  totalFollowers += artist.data.followers.total;"
"}"
"return Functions.encodeInt256(totalFollowers);";
