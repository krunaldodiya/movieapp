import moment from "moment";
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { fetchMoviesApi } from "../apis/fetchMoviesApi";
import Media from "../components/Media";

const movie_data = {
  include_adult: false,
  include_video: false,
  page: 1,
  query: "test",
  primary_release_year: "2008",
  "release_date.lte": moment().format("Y-M-D"),
  sort_by: "popularity.desc",
  with_genres: 28,
  with_original_language: "en",
};

const Movies = ({ navigation }: any) => {
  const { data: movies, status } = useQuery(
    ["fetchMovies", { payload: movie_data }],
    fetchMoviesApi
  );

  if (status === "loading") {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        data={movies.results}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }: any) => {
          return (
            <Media
              image={item.poster_path}
              title={item.title}
              onPress={() => navigation.push("MovieDetail", { id: item.id })}
            />
          );
        }}
      />
    </View>
  );
};

export default Movies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
