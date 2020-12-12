import axios, { getSource } from "../libs/http";
import { tmdbApiKey, tmdbApiUrl } from "../libs/vars";

export const fetchMovieDetailApi = async (
  _key: string,
  id: number
): Promise<any> => {
  const url = `${tmdbApiUrl}/movie/${id}`;

  const { data } = await axios.get(url, {
    cancelToken: getSource().token,
    params: { api_key: tmdbApiKey, append_to_response: "external_ids" },
  });

  return data;
};
