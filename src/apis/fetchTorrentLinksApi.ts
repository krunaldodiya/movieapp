import axios, { getSource } from "../libs/http";
import { jackettApiKey, jackettApiUrl } from "../libs/vars";

export type IQualities = "360p" | "480p" | "720p" | "1080p";
export interface FetchTorrentLinksApiPayload {
  aka: string;
  imdb_id: string;
  quality: IQualities;
  year: number;
  audio_language?: string;
}

const api = `${jackettApiUrl}/api/v2.0/indexers/all/results`;

export const fetchTorrentLinksApi = async (
  _key: string,
  payload: FetchTorrentLinksApiPayload
): Promise<any> => {
  const query = `${payload.aka} ${payload.year} ${payload.quality} ${
    payload.audio_language ? payload.audio_language : ""
  }`;

  const params = new URLSearchParams({
    apikey: jackettApiKey,
    Query: query,
  });

  const metadata = params.toString().replaceAll("+", " ");

  const { data } = await axios.get(`${api}?${metadata}`, {
    cancelToken: getSource().token,
  });

  return data.Results;
};
