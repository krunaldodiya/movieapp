import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IQualities } from "../../apis/fetchTorrentLinksApi";
import useFetchMovieDetail from "../../hooks/useFetchMovieDetail";
import useFetchTorrentLinks from "../../hooks/useFetchTorrentLinks";
import formatBytes from "../../libs/formatBytes";
import axios from "../../libs/http";

const qualities: IQualities[] = ["360p", "480p", "720p", "1080p"];

const MovieLinks = ({ route, navigation }: any) => {
  const { id } = route.params;

  const [selectedQuality, setSelectedQuality] = useState<IQualities>("720p");

  const { data: movie } = useFetchMovieDetail(id);

  const { release_date, title, external_ids } = movie;

  const year = release_date?.split("-")[0];

  const {
    data: links,
    status: fetchTorrentLinkStatus,
    isLoading,
  } = useFetchTorrentLinks({
    aka: title,
    imdb_id: external_ids?.imdb_id,
    quality: selectedQuality,
    year,
  });

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        {qualities.map((quality: IQualities) => {
          return (
            <TouchableOpacity
              key={quality}
              onPress={() => {
                setSelectedQuality(quality);
              }}
            >
              <Text
                style={{
                  color: quality === selectedQuality ? "green" : "black",
                }}
              >
                {quality}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={links}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }: any) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: 5,
                    margin: 5,
                    borderWidth: 1,
                    borderColor: "#ddd",
                  }}
                  onPress={() => {
                    navigation.push("Player", {
                      link: item?.MagnetUri ? item?.MagnetUri : item?.Link,
                    });
                  }}
                >
                  <Text>{item?.Title}</Text>
                  <Text>Seeders {item?.Seeders}</Text>
                  <Text>Size {formatBytes(item?.Size)}</Text>
                  <Text>Tracker {item?.Tracker}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default MovieLinks;
