import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { styles } from "./styles";

const IconButton = (props) => {
  const {
    icon,
    onPress: pressHandler,
    active: activeProp,
    defaultActive,
    style = {},
    loading,
    ...rest
  } = props;
  const [active, setIsActive] = useState(defaultActive || false);
  const { colors } = useTheme();

  const handlePress = () => {
    pressHandler && pressHandler();
  };

  useEffect(() => {
    setIsActive(!!activeProp);
  }, [activeProp]);

  return (
    <Pressable
      onPress={handlePress}
      style={{ ...styles.iconButton, backgroundColor: colors.gray2, ...style }}
      {...rest}
    >
      {loading ? (
        <CircleFade size={12} color="#FFF" />
      ) : (
        React.cloneElement(icon, {
          color: active ? colors.secondary : "white",
        })
      )}
    </Pressable>
  );
};

export default IconButton;
