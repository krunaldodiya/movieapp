import { queryCache, useQuery } from "react-query";
import { fetchMovieDetailApi } from "../apis/fetchMovieDetailApi";
import { movieMetaStore } from "../store/movieMetaStore";

export default function useFetchMovieDetail(id: number) {
  const { meta } = movieMetaStore();

  return useQuery(["fetchMovieDetail", id], fetchMovieDetailApi, {
    initialData: () => {
      const movies: any = queryCache.getQueryData(["fetchMovies", meta]);

      const sortedData = movies?.reduce((items: any[], current: any) => {
        return [...items, ...current.results];
      }, []);

      return sortedData.find((movie: any) => movie.id === id);
    },
    initialStale: true,
  });
}
