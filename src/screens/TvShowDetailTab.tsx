import { Entypo } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import TvShowDetail from "./TvShows/TvShowDetail";
import TvShowLinks from "./TvShows/TvShowLinks";

const TvShowDetailTab = ({ route, navigation }: any) => {
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
        name="TvShowDetail"
        initialParams={route.params}
        component={TvShowDetail}
        options={{
          title: "TvShow Detail",
          tabBarIcon: ({ color }: any) => (
            <Entypo name="home" size={32} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="TvShowLinks"
        initialParams={route.params}
        component={TvShowLinks}
        options={{
          title: "TvShow Links",
          tabBarIcon: ({ color }: any) => (
            <Entypo name="link" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TvShowDetailTab;
