import { PlaylistInput } from "@/components/PlaylistInput";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-dvh">
      <header className="grid flex-1 place-content-center">
        <div className="flex gap-2 justify-center items-center">
          <span className="icon-[solar--music-note-3-bold] text-4xl text-accent" />
          <h1 className="text-2xl text-primary">Playlist Viewer</h1>
        </div>
        <p className="text-center text-primaryLight">View a playlist or login to view private playlists</p>
      </header>
      <main className="flex flex-col gap-4 items-center px-3 mx-auto w-full max-w-2xl">
        <PlaylistInput />
        <div className="flex gap-4 items-center w-full">
          <div className="flex-1 h-[1px] bg-primary" />
          <div className="text-center text-primary">or</div>
          <div className="flex-1 h-[1px] bg-primary" />
        </div>
      </main>
      <footer className="flex-1"></footer>
    </div>
  );
}
