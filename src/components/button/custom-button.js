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
});

const CustomButton = (props) => {
  const { children, variant, style, ...rest } = props;
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => console.log("its pressed")}
      style={({pressed}) => ({
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
