import React from "react";
import { Text, View } from "react-native";
import useFetchMovieDetail from "../../hooks/useFetchMovieDetail";

const MovieDetail = ({ route, navigation }: any) => {
  const { id } = route.params;

  const { data: movie } = useFetchMovieDetail(id);

  const { release_date, title, external_ids } = movie;

  const year = release_date?.split("-")[0];

  return (
    <View>
      <Text>{title}</Text>
      <Text>{year}</Text>
      <Text>{external_ids?.imdb_id}</Text>
    </View>
  );
};

export default MovieDetail;
