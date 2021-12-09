import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SCREENS } from "../constants/screens";
import { ForgotPassword, Login, Register } from "../screens";

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.REGISTER} component={Register} />
      <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
