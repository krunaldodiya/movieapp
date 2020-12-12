import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useMutation, useQuery } from "react-query";
import {
  fetchTorrentLinksApi,
  IQualities,
} from "../../apis/fetchTorrentLinksApi";
import useFetchMovieDetail from "../../hooks/useFetchMovieDetail";
import formatBytes from "../../libs/formatBytes";

const qualities: IQualities[] = ["360p", "480p", "720p", "1080p"];

const MovieLinks = ({ route, navigation }: any) => {
  const { id } = route.params;

  const [links, setLinks] = useState<any[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<IQualities>();

  const { data: movie } = useFetchMovieDetail(id);

  const [fetchLinks, { status: fetchTorrentLinkStatus }] = useMutation(
    fetchTorrentLinksApi
  );

  useEffect(() => {
    setSelectedQuality("720p");
    handleFetchLinks("720p");
  }, []);

  if (status === "loading") {
    return <ActivityIndicator />;
  }

  const { release_date, title, imdb_id } = movie;

  const year = release_date?.split("-")[0];

  const handleFetchLinks = async (quality: IQualities) => {
    const data = await fetchLinks({
      aka: title,
      imdb_id,
      quality,
      year,
    });

    setLinks(data.links);
  };

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
              onPress={() => {
                setSelectedQuality(quality);
                handleFetchLinks(quality);
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

      {fetchTorrentLinkStatus === "loading" && <Text>Fetching...</Text>}

      <FlatList
        data={links}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push("Player", {
                  link: item?.magnet_link
                    ? item?.magnet_link
                    : item?.direct_link,
                });
              }}
            >
              <Text>{item?.title}</Text>
              <Text>{item?.seeders}</Text>
              <Text>{formatBytes(item?.size)}</Text>
              <Text>{item?.tracker}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MovieLinks;
