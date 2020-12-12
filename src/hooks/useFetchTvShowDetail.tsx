import { queryCache, useQuery } from "react-query";
import { fetchTvShowDetailApi } from "../apis/fetchTvShowDetailApi";
import { tvShowMetaStore } from "../store/tvShowMetaStore";

export default function useFetchTvShowDetail(id: number) {
  const { meta } = tvShowMetaStore();

  return useQuery(["fetchTvShowDetail", id], fetchTvShowDetailApi, {
    initialData: () => {
      const shows: any = queryCache.getQueryData(["fetchTvShows", meta]);

      const sortedData = shows?.reduce((items: any[], current: any) => {
        return [...items, ...current.results];
      }, []);

      return sortedData.find((show: any) => show.id === id);
    },
    initialStale: true,
  });
}
