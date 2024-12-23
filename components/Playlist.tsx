"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { youtube_v3 } from "googleapis";
import { useEffect, useRef, useCallback } from "react";

type Props = {
  playlistItems: youtube_v3.Schema$PlaylistItemListResponse;
  playlistData: youtube_v3.Schema$Playlist;
};

export const Playlist = ({ playlistItems, playlistData }: Props) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchPlaylistItems = useCallback(
    async ({ pageParam = "" }) => {
      const response = await fetch("/api/get-playlist-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId: playlistData.id, pageToken: pageParam }),
      });
      if (!response.ok) throw new Error("Failed to fetch playlist items");
      return response.json() as Promise<youtube_v3.Schema$PlaylistItemListResponse>;
    },
    [playlistData.id]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["playlist-items", playlistData.id],
    queryFn: fetchPlaylistItems,
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    initialPageParam: "",
    initialData: { pages: [playlistItems], pageParams: [""] },
  });

  const flatItems = data?.pages.flatMap((page) => page.items ?? []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col p-2 mx-auto max-w-2xl h-dvh">
      <PlaylistHeader playlistData={playlistData} />
      <div className="flex overflow-y-scroll flex-col flex-1 gap-0 rounded-xl border scrollbar-slim bg-primary border-primary">
        {flatItems?.map((item, index) => (
          <PlaylistItem key={item.id} item={item} index={index} />
        ))}
        <div ref={observerTarget} className="h-10" />
        {isFetchingNextPage && (
          <div className="text-center">
            <span className="icon-[svg-spinners--3-dots-fade] text-primaryLight text-2xl" />
          </div>
        )}
      </div>
    </div>
  );
};

const PlaylistHeader = ({ playlistData }: { playlistData: youtube_v3.Schema$Playlist }) => (
  <div className="pb-3">
    <h1 className="mb-2 text-2xl font-bold text-primary">{playlistData.snippet?.title}</h1>
    <p className="mb-2 text-primaryLight">{playlistData.snippet?.description}</p>
    <div className="flex items-center text-primary">
      <span>{playlistData.contentDetails?.itemCount} tracks</span>
      <span className="px-2 text-xs text-primaryLight">•</span>
      <span>{playlistData.snippet?.channelTitle}</span>
    </div>
  </div>
);

const PlaylistItem = ({ item, index }: { item: youtube_v3.Schema$PlaylistItem; index: number }) => (
  <div key={item.id} className="flex items-center p-2 rounded-lg hover:bg-primaryDark">
    <div className="flex flex-1 items-center min-w-0">
      <span className="mr-4 w-6 text-right text-primaryLight">{index + 1}</span>
      {item.snippet?.thumbnails?.default?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.snippet.thumbnails.default.url}
          alt="Thumbnail"
          className="object-cover flex-shrink-0 mr-4 w-12 h-12 rounded-md"
        />
      ) : (
        <div className="grid place-content-center mr-4 w-12 h-12 rounded-md bg-primaryDark text-primaryLight">?</div>
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="truncate text-primary">{item.snippet?.title}</div>
        <div className="truncate text-primaryLight">
          {item.snippet?.videoOwnerChannelTitle?.replace(/\s*-\s*Topic$/, "")}
        </div>
      </div>
    </div>
    <div className="ml-4 text-primaryLight">
      {new Date(item.snippet?.publishedAt ?? "").toLocaleDateString("en-GB")}
    </div>
  </div>
);