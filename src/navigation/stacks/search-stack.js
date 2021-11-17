import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SCREENS } from "../../constants/screens";
import { Search } from "../../screens";

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.SEARCH} component={Search} />
    </Stack.Navigator>
  );
};

export default SearchStack;
