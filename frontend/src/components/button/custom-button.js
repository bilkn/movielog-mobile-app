import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, Pressable } from "react-native";
import { styles } from "./styles";
import { CircleFade } from "react-native-animated-spinkit";

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
  const {
    children,
    onPress: handlePress,
    variant,
    style,
    loading,
    ...rest
  } = props;
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
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <CircleFade size={24} color="#FFF" />
      ) : (
        <Text style={{ ...getTextStyleByVariant(colors)[variant] }}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
