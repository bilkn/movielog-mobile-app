import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SCREENS } from "../constants/screens";
import { ForgotPassword, ResetPassword, SignIn, SignUp } from "../screens";

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.SIGN_IN} component={SignIn} />
      <Stack.Screen name={SCREENS.SIGN_UP} component={SignUp} />
      <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={SCREENS.RESET_PASSWORD} component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
