import { View } from "moti";
import React from "react";
import { CircleFade } from "react-native-animated-spinkit";

function Spinner() {
  return (
    <View style={{ alignItems: "center", paddingVertical: 10 }}>
      <CircleFade color="white" size={30} />
    </View>
  );
}

export default Spinner;
