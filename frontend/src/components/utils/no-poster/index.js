import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Typography } from "../..";

const NoPoster = (props) => {
  const { style = {}, fontVariant } = props;
  const { colors } = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: colors.gray2,
        justifyContent: "center",
        ...style,
      }}
    >
      <Typography variant={fontVariant}>No Poster</Typography>
      <Typography variant={fontVariant}>Avaliable</Typography>
    </View>
  );
};

export default NoPoster;
