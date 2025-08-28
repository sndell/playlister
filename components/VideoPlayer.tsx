"use client";

import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

export const VideoPlayer = ({ id }: { id?: string }) => {
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [canUpdateVolume, setCanUpdateVolume] = useState(false);
  const playStartTimeRef = useRef<number | null>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    playStartTimeRef.current = Date.now();
    setCanUpdateVolume(false);

    // Allow volume updates after 0.5 seconds
    setTimeout(() => {
      setCanUpdateVolume(true);
    }, 500);
  };

  useEffect(() => {
    setCanUpdateVolume(false);
    playStartTimeRef.current = null;
  }, [id]);

  if (!id) return null;

  return (
    <div className="bg-primary border border-primary rounded-xl mt-3 p-3 relative">
      <button className="absolute -top-3 -right-3  rounded-full grid place-items-center z-50 bg-primary">
        <span className="icon-[solar--close-circle-bold] text-primaryLight text-3xl" />
      </button>
      <ReactPlayer
        slot="media"
        src={`https://www.youtube.com/watch?v=${id}`}
        className="rounded-xl aspect-video overflow-hidden"
        controls={true}
        playing={isPlaying}
        width="100%"
        height="100%"
        volume={volume}
        onVolumeChange={(e) => canUpdateVolume && setVolume(e.currentTarget.volume)}
        onPlay={handlePlay}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};
