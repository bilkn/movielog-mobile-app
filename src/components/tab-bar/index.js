import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { SCREENS } from "../../constants/screens";
import { Home, Search, List, Profile } from "../../screens";
import { styles } from "./styles";
import { Ionicons, Feather } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const getIconColor = {};

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
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={27} color="black" />
          ),
          tabBarActiveTintColor: colors.primary,
        }}
      />
      <Tab.Screen
        name={SCREENS.SEARCH}
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={27} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
