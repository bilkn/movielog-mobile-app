import { useTheme } from "@react-navigation/native";
import React from "react";
import { SCREENS } from "../constants/screens";
import { HomeTabs } from ".";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AboutMovieData,
  ChangePassword,
  MovieDetail,
  MoviesByGenre,
} from "../screens";

const Stack = createStackNavigator();

const MainStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.primary,
          borderColor: colors.primaryBorder,
          borderBottomWidth: 1,
        },
      }}
    >
      <Stack.Screen
        name={SCREENS.HOME}
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          title: "Movie Detail",
          headerBackTitle:''
        }}
        name={SCREENS.MOVIE_DETAIL}
        component={MovieDetail}
      />
      <Stack.Screen name={SCREENS.MOVIES_BY_GENRE} component={MoviesByGenre} />
      <Stack.Screen
        options={{
          title: "Change Password",
          headerBackTitle:''
        }}
        name={SCREENS.CHANGE_PASSWORD}
        component={ChangePassword}
      />
      <Stack.Screen
        options={{
          title: "About Movie Data",
          headerBackTitle:''
        }}
        name={SCREENS.ABOUT_MOVIE_DATA}
        component={AboutMovieData}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
