import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

const LoadMore = ({ isFetching, fetchMore, total_pages, page }: any) => {
  if (total_pages <= page) return <View />;

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
          onPress={fetchMore}
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
};

export default LoadMore;
