import { useQuery } from "react-query";
import axios, { getSource } from "../libs/http";
import { tmdbApiKey, tmdbApiUrl } from "../libs/vars";

export default function useGenres(type: "tv" | "movie") {
  return useQuery(
    "genres",
    async () => {
      const url = `${tmdbApiUrl}/genre/${type}/list`;

      const { data } = await axios.get(url, {
        cancelToken: getSource().token,
        params: { api_key: tmdbApiKey },
      });

      return data;
    },
    {}
  );
}
