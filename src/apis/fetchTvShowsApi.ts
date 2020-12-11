import axios, { getSource } from "../libs/http";
import { apiUrl, tmdbApiKey, tmdbApiUrl } from "../libs/vars";

interface FetchTvShowApiPayload {
  include_adult: boolean;
  include_video: boolean;
  page: number;
  query: string;
  first_air_date_year: string;
  "air_date.lte": string;
  sort_by: "popularity.desc" | "release_date.desc" | "original_title.asc";
  with_genres: number;
  with_original_language: string;
}

export const fetchTvShowsApi = async (
  _key: string,
  payload: FetchTvShowApiPayload
): Promise<any> => {
  const section = payload.query ? "search" : "discover";
  const url = `${tmdbApiUrl}/${section}/tv`;

  const { data } = await axios.get(url, {
    cancelToken: getSource().token,
    params: { ...payload, api_key: tmdbApiKey },
  });

  return data;
};
