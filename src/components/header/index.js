import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

const Header = () => {
  const { colors } = useTheme();
  return (
    <View>
      <View style={styles.logoContainer}>
        <Text style={{ ...styles.logo, color: colors.text }}>Movie</Text>
        <Text style={{ ...styles.logo, color: colors.secondary }}>log</Text>
      </View>
    </View>
  );
};

export default Header;
