import { useQuery } from "react-query";
import {
  fetchTorrentLinksApi,
  FetchTorrentLinksApiPayload,
} from "../apis/fetchTorrentLinksApi";

export default function useFetchTorrentLinks(
  payload: FetchTorrentLinksApiPayload
) {
  return useQuery(["fetchLinks", payload], fetchTorrentLinksApi);
}
