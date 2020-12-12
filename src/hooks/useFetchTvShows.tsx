import { useInfiniteQuery } from "react-query";
import { fetchTvShowsApi } from "../apis/fetchTvShowsApi";
import { tvShowMetaStore } from "../store/tvShowMetaStore";

export default function useFetchTvShows() {
  const { meta } = tvShowMetaStore();

  return useInfiniteQuery(["fetchTvShows", meta], fetchTvShowsApi, {
    getFetchMore: (lastGroup: any) => lastGroup.page + 1,
  });
}
