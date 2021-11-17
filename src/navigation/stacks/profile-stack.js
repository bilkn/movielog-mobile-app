import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SCREENS } from "../../constants/screens";
import { Profile } from "../../screens";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREENS.PROFILE} component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
