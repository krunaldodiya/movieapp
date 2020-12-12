import React from "react";
import { Text, View } from "react-native";
import useFetchMovieDetail from "../../hooks/useFetchMovieDetail";

const MovieDetail = ({ route, navigation }: any) => {
  const { id } = route.params;

  const { data: movie } = useFetchMovieDetail(id);

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
