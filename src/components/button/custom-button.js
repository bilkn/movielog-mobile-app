import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, Pressable } from "react-native";
import { styles } from "./styles";

const getButtonStyleByVariant = (colors) => ({
  primary: {
    backgroundColor: colors.secondary,
  },
  secondary: {
    backgroundColor: colors.gray,
  },
});

const getTextStyleByVariant = (colors) => ({
  primary: {
    color: "#000",
  },
  secondary: {
    color: colors.text,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    padding: 0,
  },
});

const CustomButton = (props) => {
  const { children, onPress: handlePress, variant, style, ...rest } = props;
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => ({
        ...styles.button,
        ...getButtonStyleByVariant(colors)[variant],
        opacity: pressed ? 0.7 : 1,
        ...style,
      })}
      {...rest}
    >
      <Text style={{ ...getTextStyleByVariant(colors)[variant] }}>
        {children}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
