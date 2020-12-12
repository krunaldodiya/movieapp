import React, { useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "react-query";
import { fetchMovieDetailApi } from "../../apis/fetchMovieDetailApi";
import { fetchTorrentLinksApi } from "../../apis/fetchTorrentLinksApi";

const MovieLinks = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [links, setLinks] = useState<any[]>([]);

  const { data: movie, status } = useQuery(
    ["fetchMovieDetail", { id }],
    fetchMovieDetailApi
  );

  const [fetchLinks, { status: fetchTorrentLinkStatus }] = useMutation(
    fetchTorrentLinksApi
  );

  if (status === "loading") {
    return <ActivityIndicator />;
  }

  const { release_date, title, imdb_id } = movie;

  const quality = "720p";

  const year = release_date?.split("-")[0];

  const handleFetchLinks = async () => {
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
      <TouchableOpacity onPress={handleFetchLinks}>
        <Text>MovieDetail</Text>
      </TouchableOpacity>

      {fetchTorrentLinkStatus === "loading" && <Text>Fetching...</Text>}

      <TouchableOpacity
        onPress={() =>
          navigation.push("Player", {
            link: links[0]?.magnet_link
              ? links[0]?.magnet_link
              : links[0]?.direct_link,
          })
        }
      >
        <Text>
          {links[0]?.magnet_link
            ? links[0]?.magnet_link
            : links[0]?.direct_link}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieLinks;
