import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { SCREENS } from "../../constants/screens";
import { Home, Search, List, Profile } from "../../screens";
import { styles } from "./styles";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
const Tab = createBottomTabNavigator();

const getIconColor = {};

const CustomTitle = () => {
  return <Text>Testing one one</Text>;
};

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
        tabBarActiveTintColor: colors.ternary,
        tabBarInactiveTintColor: colors.text,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" size={27} color={color} />
          ),
          headerTitle: (props) => <CustomTitle />,
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
