import { Playlist } from "@/components/Playlist";
import { oauth2Client, youtube } from "@/lib/google";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: Promise<{ playlistId: string }> }) {
  const getPlaylistDetails = async (playlistId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (accessToken) {
      try {
        oauth2Client.setCredentials({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

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

        return {
          details: playlistDetails,
          items: playlistItems,
        };
      } catch (error) {
        console.error("Error fetching playlist data:", error);
        return null;
      }
    }
    return null;
  };

  const { playlistId } = await params;
  const playlistData = await getPlaylistDetails(playlistId);
  if (!playlistData || !playlistData.items || !playlistData.details) return <div>Failed to fetch playlist data</div>;

  return <Playlist playlistItems={playlistData.items} playlistData={playlistData.details} />;
}
