import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";

const IconButton = (props) => {
  const { icon, onPress: pressHandler, defaultActive, style, ...rest } = props;
  const [active, setIsActive] = useState(defaultActive || false);
  const { colors } = useTheme();

  const handlePress = () => {
    pressHandler && pressHandler();
    setIsActive(!active);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{ ...styles.iconButton, backgroundColor: colors.gray2, ...style }}
      {...rest}
    >
      {React.cloneElement(icon, {
        color: active ? colors.secondary : "white",
      })}
    </Pressable>
  );
};

export default IconButton;
