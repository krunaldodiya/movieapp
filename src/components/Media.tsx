import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const padding = 5;

const margin = 1;

const diff = (padding + margin) * 2;

const size = width / 3 <= 240 ? width / 3 : 240;

const Media = ({ image, title, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.mediaContainer}>
          <Image
            style={styles.media}
            resizeMode="cover"
            source={{
              uri: `https://image.tmdb.org/t/p/w300/${image}`,
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Media;

const styles = StyleSheet.create({
  container: {
    padding,
    margin,
    backgroundColor: "#000",
  },
  mediaContainer: {},
  media: {
    width: size - diff,
    height: size - diff,
  },
  titleContainer: { width: size - diff, paddingTop: 5 },
  title: { color: "#fff", fontSize: 16, fontFamily: "Roboto" },
});
