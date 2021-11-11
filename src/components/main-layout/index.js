import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";

const MainLayout = ({ children }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: colors.backgroundColor }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default MainLayout;
