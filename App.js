import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { TabBar } from "./src/components";
import { MainTheme } from "./src/global-styles/main-theme";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    IcoMoon: require("./src/assets/font-icons/icomoon.ttf"),
  });

  if (!fontsLoaded) {
    return <Text> "its loading"</Text>;
  }
  return (
    /*    <NavigationContainer theme={MainTheme}>
      <Stack.Navigator>
      </Stack.Navigator>
    </NavigationContainer> */
    <>
      <StatusBar />
      <NavigationContainer theme={MainTheme}>
        <TabBar />
      </NavigationContainer>
    </>
  );
}
