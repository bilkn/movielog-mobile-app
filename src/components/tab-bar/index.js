import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { SCREENS } from "../../constants/screens";
import { Home, Search, List, Profile, MovieDetail } from "../../screens";
import { styles } from "./styles";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import HomeStackScreen from "../../screens/stacks/home-stack-screen";
const Tab = createBottomTabNavigator();

const TabBar = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          ...styles.navigator,
          backgroundColor: colors.primary,
          borderColor: colors.primaryBorder,
        },
        headerStyle: {
          backgroundColor: colors.primary,
          borderColor: colors.primaryBorder,
          borderBottomWidth: 1,
        },
        headerTintColor: colors.text,
        tabBarActiveTintColor: colors.ternary,
        tabBarInactiveTintColor: colors.text,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" size={27} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={SCREENS.SEARCH}
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={27} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.LIST}
        component={List}
        options={{
          tabBarLabel: "List",
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={27} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={27} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
