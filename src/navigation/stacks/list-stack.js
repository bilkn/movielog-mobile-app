import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SCREENS } from "../../constants/screens";
import { List } from "../../screens";

const Stack = createStackNavigator();
const ListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.LIST}
        component={List}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ListStack;
