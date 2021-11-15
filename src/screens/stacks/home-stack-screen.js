import { useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home, MovieDetail } from "../";
import { Header } from "../../components";
import { SCREENS } from "../../constants/screens";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  const { colors } = useTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          borderColor: colors.primaryBorder,
          borderBottomWidth: 1,
        },
      }}
    >
      <HomeStack.Screen
        name={SCREENS.HOME}
        component={Home}
        options={({ navigation }) => {
          return { headerTitle: () => <Header navigation={navigation} /> };
        }}
      />
      <HomeStack.Screen
        options={{ title: "Movie Detail" }}
        name={SCREENS.MOVIE_DETAIL}
        component={MovieDetail}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
