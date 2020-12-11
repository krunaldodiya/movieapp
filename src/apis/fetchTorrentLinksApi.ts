import axios, { getSource } from "../libs/http";

interface FetchTorrentLinksApiPayload {
  aka: string;
  imdb_id: string;
  quality: "240p" | "360p" | "720p" | "1080p";
  year: number;
}

export const fetchTorrentLinksApi = async (
  payload: FetchTorrentLinksApiPayload
): Promise<any> => {
  const { data } = await axios.post(
    "https://streamly.pauzr.com/api/links/movie",
    payload,
    {
      cancelToken: getSource().token,
    }
  );

  return data;
};
