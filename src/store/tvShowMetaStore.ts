import moment from "moment";
import create, { SetState, State } from "zustand";
import { devtools } from "zustand/middleware";

interface IMeta {
  include_adult: boolean;
  include_video: boolean;
  query: string;
  first_air_date_year: string;
  "air_date.lte": string;
  sort_by: "popularity.desc" | "air_date.desc" | "original_title.asc";
  with_genres: string;
  with_original_language: string;
}

interface IState extends State {
  meta: IMeta;
  setMeta: (meta: IMeta) => void;
}

export const tvShowMetaStore = create<IState>(
  devtools((set: SetState<IState>) => {
    return {
      meta: {
        include_adult: false,
        include_video: false,
        query: "",
        first_air_date_year: "",
        "air_date.lte": moment().format("Y-M-D"),
        sort_by: "popularity.desc",
        with_genres: "",
        with_original_language: "en",
      },

      setMeta: (meta: IMeta) => {
        set((state): any => {
          state.meta = meta;
        });
      },
    };
  })
);
