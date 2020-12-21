import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import Media from "../components/Media";
import useFetchTvShows from "../hooks/useFetchTvShows";
import LoadMore from "./LoadMore";

const TvShows = ({ navigation }: any) => {
  const { data: series, fetchMore, isLoading, isFetching } = useFetchTvShows();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const sortedData = series?.reduce((items, current) => {
    return [...items, ...current.results];
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="show filters"
        onPress={() => navigation.push("TvShowFilters")}
      />

      <FlatList
        numColumns={4}
        data={sortedData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }: any) => {
          return (
            <Media
              image={item.poster_path}
              title={item.name}
              onPress={() => {
                navigation.push("TvShowDetailTab", { id: item.id });
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
            total_pages={series && series[0]?.total_pages}
            page={series && series[0]?.page}
          />
        )}
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
