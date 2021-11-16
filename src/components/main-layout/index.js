import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

const MainLayout = (props) => {
  const { children, style, noMargin } = props;
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.backgroundColor,
        marginVertical: noMargin ? 0 : 30,
        ...style,
      }}
    >
      {children}
    </SafeAreaView>
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
