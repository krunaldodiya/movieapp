import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import Media from "../components/Media";
import useFetchMovies from "../hooks/useFetchMovies";
import LoadMore from "./LoadMore";

const Movies = ({ navigation }: any) => {
  const { data: movies, fetchMore, isLoading, isFetching } = useFetchMovies();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const sortedData = movies?.reduce((items, current) => {
    return [...items, ...current.results];
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="show filters"
        onPress={() => navigation.push("MovieFilters")}
      />

      <FlatList
        numColumns={4}
        data={sortedData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }: any) => {
          return (
            <Media
              image={item.poster_path}
              title={item.title}
              onPress={() => {
                navigation.push("MovieDetailTab", { id: item.id });
              }}
            />
          );
        }}
        onEndReached={() => {
          console.log("test");
        }}
        onEndReachedThreshold={0}
        ListFooterComponent={() => (
          <LoadMore
            isFetching={isFetching}
            fetchMore={() => fetchMore()}
            total_pages={movies && movies[0]?.total_pages}
            page={movies && movies[0]?.page}
          />
        )}
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
