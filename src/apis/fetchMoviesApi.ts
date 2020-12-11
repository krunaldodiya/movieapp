import axios, { getSource } from "../libs/http";
import { tmdbApiKey, tmdbApiUrl } from "../libs/vars";

interface FetchMoviesApiPayload {
  include_adult: boolean;
  include_video: boolean;
  page: number;
  query: string;
  primary_release_year: string;
  "release_date.lte": string;
  sort_by: "popularity.desc" | "release_date.desc" | "original_title.asc";
  with_genres: number;
  with_original_language: string;
}

export const fetchMoviesApi = async (
  _key: string,
  payload: FetchMoviesApiPayload
): Promise<any> => {
  const section = payload.query ? "search" : "discover";
  const url = `${tmdbApiUrl}/${section}/movie`;

  const { data } = await axios.get(url, {
    cancelToken: getSource().token,
    params: { ...payload, api_key: tmdbApiKey },
  });

  return data;
};
