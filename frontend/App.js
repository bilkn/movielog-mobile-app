import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import { MainTheme } from "./src/global-styles/main-theme";
import { QueryClient, QueryClientProvider } from "react-query";
import UserProvider from "./src/providers/UserProvider";
import { AppScreens } from "./AppScreens";
import { RootSiblingParent } from "react-native-root-siblings";
import { LogBox } from "react-native";

// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const client = new QueryClient();

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
      <RootSiblingParent>
        <StatusBar style="light" />
        <QueryClientProvider client={client}>
          <UserProvider>
            <NavigationContainer
              theme={MainTheme}
              fallback={<Text>Loading...</Text>}
            >
              <AppScreens />
            </NavigationContainer>
          </UserProvider>
        </QueryClientProvider>
      </RootSiblingParent>
    </>
  );
}
