import axios, { getSource } from "../libs/http";
import { tmdbApiKey, tmdbApiUrl } from "../libs/vars";

interface FetchMovieDetailApiPayload {
  id: number;
}

export const fetchMovieDetailApi = async (
  _key: string,
  payload: FetchMovieDetailApiPayload
): Promise<any> => {
  const url = `${tmdbApiUrl}/movie/${payload.id}`;

  const { data } = await axios.get(url, {
    cancelToken: getSource().token,
    params: { api_key: tmdbApiKey, append_to_response: "external_ids" },
  });

  return data;
};
