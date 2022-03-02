import { View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const MovieCardSkeleton = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.gray2,
        borderRadius: 10,
        height: 250,
        width: "100%",
      }}
    />
  );
};

export default MovieCardSkeleton;
