import React from "react";
import { Text, StyleSheet } from "react-native";

const getFontByVariant = {
  body: {
    fontSize: 16,
    fontWeight: "300",
  },
  title: {
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
