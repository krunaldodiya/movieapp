import { Entypo } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import MovieDetail from "./Movies/MovieDetail";
import MovieLinks from "./Movies/MovieLinks";

const MovieDetailTab = ({ route, navigation }: any) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      lazy={true}
      swipeEnabled={true}
      tabBarPosition="bottom"
      tabBarOptions={{
        activeTintColor: "#000",
        inactiveTintColor: "#a8a8a8",
        labelStyle: {
          fontFamily: "Roboto",
          fontSize: 12,
        },
        renderIndicator: () => null,
        style: {
          backgroundColor: "#2C00BBaa",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 0,
        },
        showIcon: true,
        showLabel: true,
      }}
    >
      <Tab.Screen
        name="MovieDetail"
        initialParams={route.params}
        component={MovieDetail}
        options={{
          title: "Movie Detail",
          tabBarIcon: ({ color }: any) => (
            <Entypo name="home" size={32} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MovieLinks"
        initialParams={route.params}
        component={MovieLinks}
        options={{
          title: "Movie Links",
          tabBarIcon: ({ color }: any) => (
            <Entypo name="link" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MovieDetailTab;
