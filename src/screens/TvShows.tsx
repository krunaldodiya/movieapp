import moment from "moment";
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { fetchTvShowsApi } from "../apis/fetchTvShowsApi";
import Media from "../components/Media";

const tv_data = {
  include_adult: false,
  include_video: false,
  page: 1,
  query: "test",
  "air_date.lte": moment().format("Y-M-D"),
  first_air_date_year: "2008",
  sort_by: "popularity.desc",
  with_genres: 28,
  with_original_language: "en",
};

const TvShows = ({ navigation }: any) => {
  const { data: series, status } = useQuery(
    ["fetchTvShows", { payload: tv_data }],
    fetchTvShowsApi
  );

  if (status === "loading") {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        data={series.results}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }: any) => {
          return (
            <Media
              image={item.poster_path}
              title={item.name}
              onPress={() => navigation.push("TvShowDetail", { id: item.id })}
            />
          );
        }}
      />
    </View>
  );
};

export default TvShows;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
