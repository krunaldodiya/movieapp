import React from "react";
import { Text, View } from "react-native";
import useFetchTvShowDetail from "../../hooks/useFetchTvShowDetail";

const TvShowDetail = ({ route, navigation }: any) => {
  const { id } = route.params;

  const { data: series } = useFetchTvShowDetail(id);

  const { first_air_date, name, external_ids } = series;

  const year = first_air_date?.split("-")[0];

  return (
    <View>
      <Text>{name}</Text>
      <Text>{year}</Text>
      <Text>{external_ids?.imdb_id}</Text>
    </View>
  );
};

export default TvShowDetail;
