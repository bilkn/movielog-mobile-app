import React, { useEffect } from "react";
import { useUser } from "./src/hooks";
import AuthStack from "./src/navigation/auth-stack";
import AppTabs from "./src/navigation/main-stack";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "./src/constants/screens";

export function AppScreens() {
  const { user } = useUser();
  const navigation = useNavigation();

  const handleDeepLink = (event) => {
    const parsedUrl = Linking.parse(event.url);
    const { id } = parsedUrl.queryParams;
    const { path } = parsedUrl;
    
    navigation.navigate(
      SCREENS[
        (path.includes("-") ? path.split("-").join("_") : path).toUpperCase()
      ],
      { id }
    );
  };

  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
    return () => Linking.removeEventListener("url");
  }, []);

  return <>{user?.tokens ? <AppTabs /> : <AuthStack />}</>;
}
