import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import MovieDetailTab from "./src/screens/MovieDetailTab";
import Movies from "./src/screens/Movies";
import Player from "./src/screens/Player";
import TvShowDetailTab from "./src/screens/TvShowDetailTab";
import TvShows from "./src/screens/TvShows";

const Stack = createStackNavigator();

export default function App() {
  const linking = {
    prefixes: ["movieapp://"],
    config: {
      screens: {
        Home: "/",
        Movies: "/movies",
        TvShows: "/tv-shows",
        MovieDetailTab: "/movie-detail-tab",
        TvShowDetailTab: "/tv-show-detail-tab",
        MovieDetail: "/movie-detail",
        MovieLinks: "/movie-links",
        Player: "/player",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="TvShows" component={TvShows} />
        <Stack.Screen name="MovieDetailTab" component={MovieDetailTab} />
        <Stack.Screen name="TvShowDetailTab" component={TvShowDetailTab} />
        <Stack.Screen name="Player" component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
