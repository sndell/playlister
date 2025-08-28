export const extractPlaylistId = (input: string) => {
  const regex = /list=([^&]+)/;
  const match = input.match(regex);
  return match ? match[1] : null;
};
