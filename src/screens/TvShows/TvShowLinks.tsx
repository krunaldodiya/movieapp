import React from "react";
import { Text, View } from "react-native";
import { IQualities } from "../../apis/fetchTorrentLinksApi";

const qualities: IQualities[] = ["360p", "480p", "720p", "1080p"];

const TvShowLinks = ({ route, navigation }: any) => {
  return (
    <View>
      <Text>links</Text>
    </View>
  );
};

export default TvShowLinks;
