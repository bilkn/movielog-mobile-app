import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { MovieCardItemSkeleton } from "..";

const MovieCardSkeletonList = ({ style }) => {
  const [enableAnimation, setShowEnableAnimation] = useState(false);

  useEffect(() => {
    let timeout = null;
    if (!enableAnimation) {
      timeout = setTimeout(() => setShowEnableAnimation(true), 300);
    }

    return () => clearTimeout(timeout);
  }, [enableAnimation]);

  return (
    <ScrollView
      style={{ marginTop: 30, paddingHorizontal: 20, width: "100%", ...style }}
      contentInset={{ bottom: 60 }}
    >
      {enableAnimation &&
        Array.from(new Array(4)).map((_, i) => (
          <View key={i} style={{ marginTop: i !== 0 ? 30 : 0 }}>
            <MovieCardItemSkeleton />
          </View>
        ))}
    </ScrollView>
  );
};

export default MovieCardSkeletonList;
