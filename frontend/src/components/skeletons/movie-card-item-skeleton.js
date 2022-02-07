import { View, Text } from "react-native";
import React from "react";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const Spacer = ({ height = 10 }) => <MotiView style={{ height }} />;

const MovieCardItemSkeleton = () => {
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View>
        <Skeleton radius={10} height={162} width={110} />
      </View>
      <View style={{ marginLeft: 24 }}>
        <Skeleton radius={10} height={20} width={180} />
        <Spacer />
        <Skeleton radius={10} height={20} width={180} />
        <Spacer />
        <Skeleton radius={10} height={16} width={117} />
        <Spacer height={20} />
        <Skeleton height={40} width={40} radius="round" />
      </View>
    </View>
  );
};

export default MovieCardItemSkeleton;
