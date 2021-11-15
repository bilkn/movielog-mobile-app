import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MovieDetail } from "../screens";
import { SCREENS } from "../constants/screens";

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREENS.MOVIE_DETAIL} component={MovieDetail} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
