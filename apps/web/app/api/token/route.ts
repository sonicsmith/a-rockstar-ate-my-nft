import axios from "axios";
import { NextResponse } from "next/server";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || "";

export async function GET() {
  try {
    const response = await axios
      .post(
        `https://accounts.spotify.com/api/token`,
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id,
          client_secret,
        }),
      )
      .then((res) => res.data);

    return NextResponse.json({
      accessToken: response.access_token,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return new NextResponse("Request Error", { status: 500 });
  }
}
