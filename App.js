import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { TabBar } from "./src/components";
import { MainTheme } from "./src/global-styles/main-theme";
import StackNavigator from "./src/components/stack-navigator";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    IcoMoon: require("./src/assets/font-icons/icomoon.ttf"),
    Righteous_400Regular,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <Text> "its loading"</Text>;
  }
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={MainTheme}>
        <TabBar />
      </NavigationContainer>
    </>
  );
}
