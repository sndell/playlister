import { NextRequest, NextResponse } from "next/server";
import { youtube } from "@/lib/google";
import { tryAuthenticateWithTokens } from "@/lib/auth";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  const { playlistId, pageToken } = await req.json();

  if (!playlistId) return NextResponse.json({ error: "Playlist ID is required" }, { status: 400 });

  try {
    // Try to authenticate first for private playlists
    const authResult = await tryAuthenticateWithTokens();

    if (authResult) {
      // User is authenticated, use authenticated client
      const response = await youtube.playlistItems.list({
        part: ["snippet"],
        playlistId,
        maxResults: 50,
        pageToken: pageToken || undefined,
      });

      return NextResponse.json(response.data);
    } else {
      // Not authenticated, try with public API key for public playlists
      const publicYoutube = google.youtube({
        version: "v3",
        auth: process.env.GOOGLE_API_KEY,
      });

      const response = await publicYoutube.playlistItems.list({
        part: ["snippet"],
        playlistId,
        maxResults: 50,
        pageToken: pageToken || undefined,
      });

      return NextResponse.json(response.data);
    }
  } catch (error) {
    console.error("Error fetching playlist items:", error);

    if (
      (error && typeof error === "object" && "code" in error && error.code === 401) ||
      (error instanceof Error && (error.message?.includes("invalid_grant") || error.message?.includes("invalid_token")))
    ) {
      return NextResponse.json({ error: "Authentication expired. Please log in again." }, { status: 401 });
    }

    return NextResponse.json({ error: "Failed to fetch playlist items" }, { status: 500 });
  }
}
