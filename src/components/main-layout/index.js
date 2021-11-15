import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";

const MainLayout = (props) => {
  const { children, style, noMargin } = props;
  const { colors } = useTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.backgroundColor,
        marginTop: noMargin ? 0 : 30,
        ...style,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
});

export default MainLayout;
