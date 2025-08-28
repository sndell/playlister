"use client";

import { extractPlaylistId } from "@/util/extractPlaylistId";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export const PlaylistInput = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const playlistId = useMemo(() => extractPlaylistId(input), [input]);

  const handleSubmit = () => {
    if (playlistId) {
      router.push(`/${playlistId}`);
    } else {
      setError("Invalid playlist URL or ID");
    }
  };

  return (
    <label className="space-y-2 w-full">
      <div className="text-primary">Playlist URL</div>
      <div className="flex gap-2">
        <div className="flex flex-1 items-center pr-3 rounded-xl border border-primary bg-primary shadow-lg">
          <input
            type="text"
            placeholder="Enter playlist URL"
            className="flex-1 px-3 py-2 pr-2 text-sm overflow-ellipsis bg-transparent appearance-none text-primaryLight focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span className="icon-[solar--magnifer-outline] text-primaryLight" />
        </div>
        <button onClick={handleSubmit} className="px-3 py-2 text-sm rounded-xl bg-accent text-primary shadow-lg">
          View
        </button>
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </label>
  );
};
