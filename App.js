import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { TabBar } from "./src/components";
import { MainTheme } from "./src/global-styles/main-theme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    /*    <NavigationContainer theme={MainTheme}>
      <Stack.Navigator>
      </Stack.Navigator>
    </NavigationContainer> */
    <>
      <NavigationContainer theme={MainTheme}>
        <TabBar />
      </NavigationContainer>
    </>
  );
}
