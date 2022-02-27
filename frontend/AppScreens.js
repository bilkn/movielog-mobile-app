import React from "react";
import { useUser } from "./src/hooks";
import AuthStack from "./src/navigation/auth-stack";
import AppTabs from "./src/navigation/main-stack";

export function AppScreens() {
  const { user } = useUser();
  
  return <>{user ? <AppTabs /> : <AuthStack />}</>;
}
