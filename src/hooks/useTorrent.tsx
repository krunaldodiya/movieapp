import { useState } from "react";
import axios from "../libs/http";
import { apiUrl } from "../libs/vars";
const api = "http://streamly.pauzr.com:9000";

export function useTorrent(link: string) {
  const [streamingLink, setStreamingLink] = useState<string>("");
  const [infoHash, setInfoHash] = useState<string>("");

  const getMagnet = async () => {
    if (link.startsWith("magnet:")) {
      return link;
    }

    const { data } = await axios.post(`${apiUrl}/playlist/magnet`, {
      link: { direct_link: link },
    });

    return data;
  };

  const stopTorrent = async (hash: string) => {
    axios.delete(`${api}/torrents/${hash}`);
  };

  const startTorrent = async () => {
    const magnetLink = await getMagnet();

    axios
      .post(`${api}/torrents`, { link: magnetLink })
      .then((response) => startDownloading(response.data))
      .catch((error) => console.log(error));
  };

  const startDownloading = async (data: any) => {
    axios
      .get(`${api}/torrents/${data.infoHash}`)
      .then(({ data }) => {
        if (data.files) {
          setInfoHash(data.infoHash);
          setStreamingLink(data.files[0].link);
        } else {
          startDownloading(data);
        }
      })
      .catch((error) => console.log(error));
  };

  return {
    streamingLink: `${api}${streamingLink}`,
    infoHash,
    startTorrent,
    stopTorrent,
  };
}
