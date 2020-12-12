import axios, { getSource } from "../libs/http";

export type IQualities = "360p" | "480p" | "720p" | "1080p";
export interface FetchTorrentLinksApiPayload {
  aka: string;
  imdb_id: string;
  quality: IQualities;
  year: number;
}

export const fetchTorrentLinksApi = async (
  _key: string,
  payload: FetchTorrentLinksApiPayload
): Promise<any> => {
  const { data } = await axios.post(
    "https://streamly.pauzr.com/api/links/movie",
    payload,
    {
      cancelToken: getSource().token,
    }
  );

  return data.links;
};
