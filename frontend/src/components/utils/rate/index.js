import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { styles } from "./styles";

const Rate = (props) => {
  const { readonly, value, onPress: onPressHandler } = props;
  const [rating, setRating] = useState(value || 0);
  const { colors } = useTheme();

  const handlePress = (rating) => {
    if (!readonly && onPressHandler) {
      onPressHandler();
      setRating(rating);
    }
  };

  return (
    <View style={styles.container}>
      {new Array(5).fill("").map((_, i) => (
        <Pressable
          key={i}
          style={{ marginLeft: i !== 0 ? 14 : 0 }}
          onPress={() => handlePress(i + 1)}
        >
          <Entypo
            name="star"
            size={15}
            color={i < rating ? colors.secondary : "#C4C4C4"}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default Rate;
