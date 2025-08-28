"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { youtube_v3 } from "googleapis";
import { useEffect, useRef, useCallback, useState } from "react";
import { VideoPlayer } from "./VideoPlayer";

type Props = {
  playlistItems: youtube_v3.Schema$PlaylistItemListResponse;
  playlistData: youtube_v3.Schema$Playlist;
};

export const Playlist = ({ playlistItems, playlistData }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  console.log(playlistItems);

  const fetchPlaylistItems = useCallback(
    async ({ pageParam = "" }) => {
      const response = await fetch("/api/get-playlist-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId: playlistData.id, pageToken: pageParam }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 401) {
          // Authentication error - redirect to login
          window.location.href = "/";
          throw new Error(errorData.error || "Authentication required");
        }

        throw new Error(errorData.error || "Failed to fetch playlist items");
      }

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
  const itemCount = flatItems?.length ?? 0;

  const virtualizer = useVirtualizer({
    count: itemCount + (isFetchingNextPage ? 1 : 0), // +1 for loading indicator
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // Estimated height of each item
    overscan: 5, // Number of items to render outside of visible area
  });

  // Infinite scrolling logic
  useEffect(() => {
    const virtualItems = virtualizer.getVirtualItems();
    const [lastItem] = [...virtualItems].reverse();

    if (!lastItem) return;

    // Trigger fetch when we're near the end
    if (lastItem.index >= itemCount - 5 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, itemCount, isFetchingNextPage, virtualizer]);

  return (
    <div className="flex flex-col p-2 mx-auto max-w-xl h-dvh">
      <PlaylistHeader playlistData={playlistData} />
      <div
        ref={parentRef}
        className="flex overflow-y-auto flex-col flex-1 rounded-xl border scrollbar-slim bg-primary border-primary"
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const isLoaderRow = virtualItem.index === itemCount;
            const item = flatItems?.[virtualItem.index];

            return (
              <div
                key={virtualItem.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {isLoaderRow ? (
                  <LoadingIndicator />
                ) : item ? (
                  <PlaylistItem item={item} index={virtualItem.index} setSelectedVideoId={setSelectedVideoId} />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <VideoPlayer id={selectedVideoId ?? undefined} />
    </div>
  );
};

const PlaylistHeader = ({ playlistData }: { playlistData: youtube_v3.Schema$Playlist }) => (
  <div className="pb-3">
    <h1 className="mb-2 text-2xl font-bold text-primary">{playlistData.snippet?.title}</h1>
    <p className="mb-2 text-primaryLight">
      {playlistData.snippet?.description ? playlistData.snippet?.description : "No description"}
    </p>
    <div className="flex items-center text-primary">
      <span>{playlistData.contentDetails?.itemCount} tracks</span>
      <span className="px-2 text-xs text-primaryLight">•</span>
      <span>{playlistData.snippet?.channelTitle}</span>
    </div>
  </div>
);

const PlaylistItem = ({
  item,
  index,
  setSelectedVideoId,
}: {
  item: youtube_v3.Schema$PlaylistItem;
  index: number;
  setSelectedVideoId: (id: string) => void;
}) => (
  <div
    className="flex items-center p-2 pl-0 rounded-lg hover:bg-primaryDark cursor-pointer"
    onClick={() => setSelectedVideoId(item.snippet?.resourceId?.videoId ?? "")}
  >
    <div className="flex flex-1 items-center min-w-0">
      <span className="w-10 text-center text-primaryLight text-sm">{index + 1}</span>
      <ThumbnailOrPlaceholder url={item.snippet?.thumbnails?.default?.url} />
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

const ThumbnailOrPlaceholder = ({ url }: { url?: string | null }) =>
  url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt="Thumbnail" className="object-cover flex-shrink-0 mr-4 w-12 h-12 rounded-md" />
  ) : (
    <div className="grid place-content-center mr-4 w-12 h-12 rounded-md bg-primaryDark text-primaryLight">?</div>
  );

const LoadingIndicator = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <span className="icon-[svg-spinners--3-dots-fade] text-primaryLight text-2xl" />
  </div>
);
