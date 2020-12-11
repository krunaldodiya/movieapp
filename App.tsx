import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Movies from "./src/screens/Movies";
import TvShows from "./src/screens/TvShows";
import MovieDetail from "./src/screens/MovieDetail";
import TvShowDetail from "./src/screens/TvShowDetail";
import Home from "./src/screens/Home";
import Player from "./src/screens/Player";

const Stack = createStackNavigator();

export default function App() {
  const linking = {
    prefixes: ["movieapp://"],
    config: {
      screens: {
        Home: "/",
        Movies: "/movies",
        TvShows: "/tv-shows",
        MovieDetail: "/movie-detail",
        TvShowDetail: "/tv-show-detail",
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
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
        <Stack.Screen name="TvShowDetail" component={TvShowDetail} />
        <Stack.Screen name="Player" component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
