import React from "react";
import { Text, StyleSheet } from "react-native";

const getFontByVariant = {
  body: {
    fontFamily: "Roboto_300Light",
    fontSize: 16,
    fontWeight: "300",
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 24,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 20,
  },
  text: {
    fontSize: 18,
  },
  textSmall: {
    fontSize: 14,
  },
};

const Typography = (props) => {
  const { children, variant, color, style = {} } = props;
  return (
    <Text
      style={{
        ...styles,
        ...getFontByVariant[variant],
        fontFamily:
          getFontByVariant[variant]?.fontFamily || "Roboto_400Regular",
        color: color || "white",
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({});

export default Typography;
