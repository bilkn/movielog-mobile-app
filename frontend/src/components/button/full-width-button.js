import { useTheme } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import { Typography } from "..";
import { styles } from "./styles";

const getTextColorByVariant = (colors) => ({
  important: {
    color: colors.ternary,
  },
});

const FullWidthButton = (props) => {
  const { colors } = useTheme();
  const { children, style, variant, ...rest } = props;
  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: colors.gray,
        borderColor: colors.grayBorder,
        borderBottomWidth: 1,
        opacity: pressed ? 0.7 : 1,
        ...styles.fullWidthButton,
        ...style,
      })}
      {...rest}
    >
      <Typography color={getTextColorByVariant(colors)[variant]?.color}>
        {children}
      </Typography>
    </Pressable>
  );
};

export default FullWidthButton;
