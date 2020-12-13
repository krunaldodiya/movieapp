import axios, { getSource } from "../libs/http";
import { apiUrl } from "../libs/vars";

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
  const { data } = await axios.post(`${apiUrl}/links/movie`, payload, {
    cancelToken: getSource().token,
  });

  return data.links;
};
