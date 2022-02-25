import React from "react";
import { ScrollView, View } from "react-native";
import { MovieCardItemSkeleton } from "..";

const MovieCardSkeletonList = ({ style }) => {
  return (
    <ScrollView
      style={{ marginTop: 30, paddingHorizontal: 20, width: "100%", ...style }}
      contentInset={{ bottom: 60 }}
    >
      {Array.from(new Array(4)).map((_, i) => (
        <View key={i} style={{ marginTop: i !== 0 ? 30 : 0 }}>
          <MovieCardItemSkeleton />
        </View>
      ))}
    </ScrollView>
  );
};

export default MovieCardSkeletonList;
