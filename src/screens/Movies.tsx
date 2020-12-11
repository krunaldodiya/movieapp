import moment from "moment";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useInfiniteQuery } from "react-query";
import { fetchMoviesApi } from "../apis/fetchMoviesApi";
import Media from "../components/Media";

const Movies = ({ navigation }: any) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("en");
  const [year, setYear] = useState("");

  const meta = {
    include_adult: false,
    include_video: false,
    query,
    primary_release_year: year,
    "release_date.lte": moment().format("Y-M-D"),
    sort_by: "popularity.desc",
    with_genres: genre,
    with_original_language: language,
  };

  const { data: movies, fetchMore, isLoading, isFetching } = useInfiniteQuery(
    ["fetchMovies", meta],
    fetchMoviesApi,
    {
      getFetchMore: (lastGroup) => lastGroup.page + 1,
    }
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const sortedData = movies?.reduce((items, current) => {
    return [...items, ...current.results];
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={4}
        data={sortedData}
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
        ListFooterComponent={() => {
          return isFetching ? (
            <Text>Loading...</Text>
          ) : (
            <TouchableOpacity
              disabled={isFetching}
              style={{ padding: 10, alignItems: "center" }}
              onPress={() => {
                fetchMore();
              }}
            >
              <Text>Load More</Text>
            </TouchableOpacity>
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
