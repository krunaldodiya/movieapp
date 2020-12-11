import axios from "axios";
import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView } from "react-native";

const api = "http://streamly.pauzr.com:9000";

const { width } = Dimensions.get("window");

const Player = ({ route }: any) => {
  const [link, setLink] = useState<string>("");

  const playerRef = useRef<any>(null);

  useEffect(() => {
    loadTorrent();
  }, []);

  const loadTorrent = async () => {
    try {
      if (route.params?.link.startsWith("magnet:")) {
        startTorrent(route.params?.link);
      } else {
        const { data } = await axios.post(
          "https://streamly.pauzr.com/api/playlist/magnet",
          {
            link: {
              direct_link: route.params?.link,
            },
          }
        );
        startTorrent(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startTorrent = async (magnet: string) => {
    try {
      const { data } = await axios.post(`${api}/torrents`, {
        link: magnet,
      });
      await getActiveTorrent(data.infoHash);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getActiveTorrent = async (infoHash: string) => {
    try {
      const { data } = await axios.get(`${api}/torrents/${infoHash}`);
      if (data.files) {
        setLink(data.files[0].link);
      } else {
        getActiveTorrent(infoHash);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <SafeAreaView>
        {link ? (
          <Video
            ref={playerRef}
            source={{ uri: `${api}${link}` }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            isLooping={false}
            shouldPlay={true}
            style={{
              width: width,
              height: (width * 9) / 16,
            }}
            useNativeControls={true}
            onReadyForDisplay={() => console.log("test")}
          />
        ) : (
          <ActivityIndicator />
        )}
      </SafeAreaView>
    </>
  );
};

export default Player;
