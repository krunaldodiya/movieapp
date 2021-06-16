import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.push("Movies")}
      >
        <Text style={styles.title}>Movies</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.push("TvShows")}
      >
        <Text style={styles.title}>Tv Shows</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    padding: 10,
  },
  title: {
    fontSize: 22,
    textTransform: "uppercase",
  },
});
