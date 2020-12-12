import { useInfiniteQuery } from "react-query";
import { fetchMoviesApi } from "../apis/fetchMoviesApi";
import { movieMetaStore } from "../store/movieMetaStore";

export default function useFetchMovies() {
  const { meta } = movieMetaStore();

  return useInfiniteQuery(["fetchMovies", meta], fetchMoviesApi, {
    getFetchMore: (lastGroup: any) => lastGroup.page + 1,
  });
}
