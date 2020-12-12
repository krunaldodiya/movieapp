import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Media from "../components/Media";
import useFetchMovies from "../hooks/useFetchMovies";

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
        ListFooterComponent={() => {
          return (
            <View>
              {isFetching ? (
                <View style={{ padding: 20, alignItems: "center" }}>
                  <ActivityIndicator color="#000" size="small" />
                </View>
              ) : (
                <TouchableOpacity
                  disabled={isFetching}
                  style={{ padding: 20, alignItems: "center" }}
                  onPress={() => {
                    fetchMore();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Roboto",
                      textTransform: "uppercase",
                    }}
                  >
                    Load More
                  </Text>
                </TouchableOpacity>
              )}
            </View>
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
