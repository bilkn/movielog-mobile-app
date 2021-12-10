import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { ListStack, ProfileStack, SearchStack } from ".";
import { Header } from "../components";
import { SCREENS } from "../constants/screens";
import { Home } from "../screens";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1,
          backgroundColor: colors.primary,
          borderColor: colors.primaryBorder,
        },

        headerTintColor: colors.text,
        tabBarActiveTintColor: colors.ternary,
        tabBarInactiveTintColor: colors.text,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: colors.primary,
          borderColor: colors.primaryBorder,
          borderBottomWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={Home}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header navigation={navigation} />,
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-home" size={27} color={color} />
            ),
          };
        }}
      />
      <Tab.Screen
        name={SCREENS.SEARCH}
        component={SearchStack}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={27} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.LIST}
        component={ListStack}
        options={{
          tabBarLabel: "List",
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={27} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        component={ProfileStack}
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

export default HomeTabs;
