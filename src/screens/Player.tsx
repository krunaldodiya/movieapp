import { Video } from "expo-av";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  BackHandler,
} from "react-native";
import { useTorrent } from "../hooks/useTorrent";

const { width } = Dimensions.get("window");

const Player = ({ route }: any) => {
  const playerRef = useRef<any>(null);

  const { startTorrent, stopTorrent, streamingLink, infoHash } = useTorrent(
    route?.params?.link
  );

  useEffect(() => {
    startTorrent();
  }, []);

  useEffect(() => {
    return () => {
      infoHash && stopTorrent(infoHash);
    };
  }, [infoHash]);

  return (
    <>
      <SafeAreaView>
        <View>
          {streamingLink ? (
            <Video
              ref={playerRef}
              source={{ uri: streamingLink }}
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
        </View>
      </SafeAreaView>
    </>
  );
};

export default Player;
