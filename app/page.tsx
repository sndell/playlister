import { PlaylistInput } from "@/components/PlaylistInput";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { cookies } from "next/headers";
import { UserPlaylists } from "@/components/UserPlaylists";
import { cn } from "@/util/cn";
import { youtube, oauth2Client } from "@/lib/google";
import Link from "next/link";

export default async function Home() {
  const getPlaylists = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (accessToken || refreshToken) {
      try {
        oauth2Client.setCredentials({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        const response = await youtube.playlists.list({
          part: ["snippet"],
          mine: true,
          maxResults: 50,
        });

        return response.data.items;
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    }
    return null;
  };

  const playlists = await getPlaylists();

  return (
    <div className="flex flex-col w-full h-dvh gap-2">
      <header className={cn("grid place-content-center", !playlists ? "flex-1" : "py-4")}>
        <div className="flex gap-2 justify-center items-center">
          <span className="icon-[solar--playlist-linear] text-4xl text-accent" />
          <h1 className="text-2xl text-primary">Playlister</h1>
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
      <footer className="flex items-center justify-center gap-3 pb-3">
        <Link
          href="/privacy-policy"
          replace={false}
          className="text-primaryLight hover:text-primary transition-colors duration-200"
        >
          Privacy Policy
        </Link>
        <span className="text-primaryLight text-sm">•</span>
        <a
          href="https://github.com/sndell/playlister"
          target="_blank"
          className="text-primaryLight hover:text-primary transition-colors duration-200"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
