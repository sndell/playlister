import { PlaylistInput } from "@/components/PlaylistInput";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { cookies } from "next/headers";
import { google } from "googleapis";
import { UserPlaylists } from "@/components/UserPlaylists";
import { cn } from "@/util/cn";

export default async function Home() {
  const getPlaylists = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      try {
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          `${process.env.APP_URL}/api/auth/callback`
        );

        oauth2Client.setCredentials({ access_token: accessToken });
        const youtube = google.youtube({ version: "v3", auth: oauth2Client });

        const response = await youtube.playlists.list({
          part: ["snippet"],
          mine: true,
          maxResults: 50,
        });

        const playlists = response.data.items;
        return playlists;
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    }
  };

  const playlists = await getPlaylists();

  return (
    <div className="flex flex-col w-full h-dvh gap-2">
      <header className={cn("grid place-content-center", !playlists ? "flex-1" : "py-4")}>
        <div className="flex gap-2 justify-center items-center">
          <span className="icon-[solar--music-note-3-bold] text-4xl text-accent" />
          <h1 className="text-2xl text-primary">Playlist Viewer</h1>
        </div>
        <p className="text-center text-primaryLight">View a playlist or login to view private playlists</p>
      </header>
      <main className={`flex flex-col gap-4 items-center px-3 mx-auto w-full max-w-2xl`}>
        <PlaylistInput />
        <div className="flex gap-4 items-center w-full">
          <div className="flex-1 h-[1px] bg-primary" />
          <div className="text-center text-primary">or</div>
          <div className="flex-1 h-[1px] bg-primary" />
        </div>
        <GoogleAuthButton isLoggedIn={!!playlists} />
      </main>
      {playlists ? <UserPlaylists playlists={playlists} /> : <div className="flex-1" />}
    </div>
  );
}
