import React from "react";
import { Text, View } from "react-native";
import { queryCache, useQuery } from "react-query";
import { fetchMovieDetailApi } from "../../apis/fetchMovieDetailApi";
import { movieMetaStore } from "../../store/movieMetaStore";

const MovieDetail = ({ route, navigation }: any) => {
  const { id } = route.params;
  const { meta } = movieMetaStore();

  const { data: movie, status } = useQuery(
    ["fetchMovieDetail", { id }],
    fetchMovieDetailApi,
    {
      initialData: () => {
        const movies: any = queryCache.getQueryData(["fetchMovies", meta]);

        const sortedData = movies?.reduce((items: any[], current: any) => {
          return [...items, ...current.results];
        }, []);

        return sortedData.find((movie: any) => movie.id === id);
      },
      initialStale: true,
    }
  );
  console.log({ movie });

  const { release_date, title, imdb_id } = movie;

  const year = release_date?.split("-")[0];

  return (
    <View>
      <Text>{title}</Text>
      <Text>{year}</Text>
      <Text>{imdb_id}</Text>
    </View>
  );
};

export default MovieDetail;
