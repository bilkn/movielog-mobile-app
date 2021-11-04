import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SCREENS } from "./constants/screens";
import { MainTheme } from "./global-styles/main-theme";
import { Home } from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={MainTheme}>
      <Stack.Navigator>
        <Stack.Screen name={SCREENS.HOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
