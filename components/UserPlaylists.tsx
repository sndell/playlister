"use client";

import { youtube_v3 } from "googleapis";
import { useState } from "react";

type Props = {
  playlists: youtube_v3.Schema$Playlist[];
};

export const UserPlaylists = ({ playlists }: Props) => {
  const [filteredPlaylists, setFilteredPlaylists] = useState(playlists);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredPlaylists(
      playlists.filter((playlist) => playlist.snippet?.title?.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  return (
    <div className="flex flex-col max-w-2xl w-full mx-auto overflow-hidden gap-2 px-3">
      <div className="flex items-center border border-primary bg-primary rounded-xl">
        <span className="icon-[solar--magnifer-outline] text-primaryLight ml-3" />
        <input
          type="text"
          placeholder="Filter playlists..."
          className="flex-1 py-2 text-sm px-3 bg-transparent text-primaryLight focus:outline-none"
          onChange={onChange}
        />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-slim p-3 rounded-xl border border-primary bg-primary mb-2">
        <div className="flex flex-col gap-2">
          {filteredPlaylists.map((playlist) => (
            <div key={playlist.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={playlist.snippet?.thumbnails?.default?.url as string}
                  alt="playlist thumbnail"
                  className="h-16 w-16 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <h2 className="text-primary truncate">{playlist.snippet?.title}</h2>
                  <p className="text-primaryLight line-clamp-1">{playlist.snippet?.description || "No description"}</p>
                </div>
              </div>
              <div className="text-primaryLight whitespace-nowrap">
                {new Date(playlist.snippet?.publishedAt as string).toLocaleDateString("en-GB")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
