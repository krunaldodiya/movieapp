import { useQuery } from "react-query";
import axios, { getSource } from "../libs/http";
import { tmdbApiKey, tmdbApiUrl } from "../libs/vars";

export default function useLanguages() {
  return useQuery(
    "languages",
    async () => {
      const url = `${tmdbApiUrl}/configuration/languages`;

      const { data } = await axios.get(url, {
        cancelToken: getSource().token,
        params: { api_key: tmdbApiKey },
      });

      return data;
    },
    {}
  );
}
