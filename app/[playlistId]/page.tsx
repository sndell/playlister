import { Playlist } from "@/components/Playlist";
import { youtube } from "@/lib/google";
import { tryAuthenticateWithTokens } from "@/lib/auth";
import { google } from "googleapis";

export default async function Page({ params }: { params: Promise<{ playlistId: string }> }) {
  const getPlaylistDetails = async (playlistId: string) => {
    try {
      // First try with authentication for private playlists
      const authResult = await tryAuthenticateWithTokens();

      if (authResult) {
        // User is authenticated, use authenticated YouTube client
        const [playlistResponse, playlistItemsResponse] = await Promise.all([
          youtube.playlists.list({
            part: ["snippet", "contentDetails"],
            id: [playlistId],
          }),
          youtube.playlistItems.list({
            part: ["snippet"],
            playlistId,
            maxResults: 50,
          }),
        ]);

        const playlistDetails = playlistResponse.data.items?.[0];
        const playlistItems = playlistItemsResponse.data;

        if (playlistDetails && playlistItems) {
          return {
            details: playlistDetails,
            items: playlistItems,
          };
        }
      }

      // If not authenticated or playlist not found, try with public API key
      const publicYoutube = google.youtube({
        version: "v3",
        auth: process.env.GOOGLE_API_KEY,
      });

      const [playlistResponse, playlistItemsResponse] = await Promise.all([
        publicYoutube.playlists.list({
          part: ["snippet", "contentDetails"],
          id: [playlistId],
        }),
        publicYoutube.playlistItems.list({
          part: ["snippet"],
          playlistId,
          maxResults: 50,
        }),
      ]);

      const playlistDetails = playlistResponse.data.items?.[0];
      const playlistItems = playlistItemsResponse.data;

      return {
        details: playlistDetails,
        items: playlistItems,
      };
    } catch (error) {
      console.error("Error fetching playlist data:", error);
      return null;
    }
  };

  const { playlistId } = await params;
  const playlistData = await getPlaylistDetails(playlistId);
  if (!playlistData || !playlistData.items || !playlistData.details) return <div>Failed to fetch playlist data</div>;

  return <Playlist playlistItems={playlistData.items} playlistData={playlistData.details} />;
}
