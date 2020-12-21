import axios, { getSource } from "../libs/http";
import { apiUrl } from "../libs/vars";

export type IQualities = "360p" | "480p" | "720p" | "1080p";
export interface FetchTorrentLinksApiPayload {
  aka: string;
  imdb_id: string;
  quality: IQualities;
  year: number;
}
const api =
  "http://streamly.pauzr.com:9117/api/v2.0/indexers/all/results?apikey=z9gps9m3ieusx5poe0418ku05gcs49dz";

export const fetchTorrentLinksApi = async (
  _key: string,
  payload: FetchTorrentLinksApiPayload
): Promise<any> => {
  const { data } = await axios.get(
    `${api}&Query=${payload.aka}+${payload.year}+${payload.quality}&Category[]=2000`,
    {
      cancelToken: getSource().token,
    }
  );

  // const { data } = await axios.post(`${apiUrl}/links/movie`, payload, {
  //   cancelToken: getSource().token,
  // });

  return data.Results;
};
