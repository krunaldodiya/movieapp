import React, { useState } from "react";
import { View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import useGenres from "../../hooks/useGenres";
import useLanguages from "../../hooks/useLanguages";
import { movieMetaStore } from "../../store/movieMetaStore";

const MovieFilters = ({ navigation }: any) => {
  const { meta, setMeta } = movieMetaStore();

  const [search, setSearch] = useState<string>(meta.query);
  const [year, setYear] = useState<string>(meta.primary_release_year);

  const { data: genres } = useGenres("movie");
  const { data: languages } = useLanguages();

  console.log(genres, "genres");
  console.log(languages, "languages");

  return (
    <View>
      <TextInput
        value={search}
        placeholder="keywords"
        onChangeText={(data: string) => setSearch(data)}
      />
      <TextInput
        value={year}
        placeholder="year"
        onChangeText={(data: string) => setYear(data)}
      />
      <Button
        title="apply filters"
        onPress={() => {
          setMeta({ ...meta, query: search, primary_release_year: year });
          navigation.pop();
        }}
      />
    </View>
  );
};

export default MovieFilters;
