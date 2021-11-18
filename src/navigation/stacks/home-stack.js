import { useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Header } from "../../components";
import { SCREENS } from "../../constants/screens";
import { Home, MovieDetail } from "../../screens";

const Stack = createStackNavigator();

const HomeStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          borderColor: colors.primaryBorder, 
          borderBottomWidth: 1,
        },
      }}
    >
      <Stack.Screen
        name={SCREENS.HOME}
        component={Home}
        options={({ navigation }) => {
          return { headerTitle: () => <Header navigation={navigation} /> };
        }}
      />
      <Stack.Screen
        options={{ title: "Movie Detail" }}
        name={SCREENS.MOVIE_DETAIL}
        component={MovieDetail}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
