export const PlaylistInput = () => (
  <label className="space-y-2 w-full">
    <div className="text-primary">Playlist URL or ID</div>
    <div className="flex gap-2">
      <div className="flex flex-1 items-center pr-3 rounded-xl border border-primary bg-primary">
        <input
          type="text"
          placeholder="Enter playlist URL or ID"
          className="flex-1 px-3 py-2 pr-2 text-sm overflow-ellipsis bg-transparent appearance-none text-primaryLight focus:outline-none"
        />
        <span className="icon-[solar--magnifer-outline] text-primaryLight" />
      </div>
      <button className="px-3 py-2 text-sm rounded-xl bg-accent text-primary">View</button>
    </div>
  </label>
);
