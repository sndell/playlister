import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { oauth2Client, youtube } from "@/lib/google";

export async function POST(req: NextRequest) {
  const { playlistId, pageToken } = await req.json();

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!playlistId) return NextResponse.json({ error: "Playlist ID is required" }, { status: 400 });

  try {
    oauth2Client.setCredentials({ access_token: accessToken });

    const response = await youtube.playlistItems.list({
      part: ["snippet"],
      playlistId,
      maxResults: 50,
      pageToken: pageToken || undefined,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching playlist items:", error);
    return NextResponse.json({ error: "Failed to fetch playlist items" }, { status: 500 });
  }
}
