import React from "react";
import { View, Text, ActionSheetIOS } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";

const categoryList = [
  {
    genre: "Action",
    iconName: "gun",
  },
  {
    genre: "Action",
    iconName: "gun",
  },
  {
    genre: "Action",
    iconName: "gun",
  },
  {
    genre: "Action",
    iconName: "gun",
  },
];

const Category = () => {
  const Icon = createIconSetFromIcoMoon(
    require("../../assets/font-icons/selection.json"),
    "IcoMoon",
    "icomoon.ttf"
  );
  return (
    <View style={styles.container}>
      {categoryList.map(({ title, iconName }) => (
        <View>
          <Text>{title}</Text>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 360, y: 360 }}
            colors={["rgba(255, 255, 255, 0.49)", "rgba(255, 255, 255, 0.21)"]}
            style={styles.card}
          >
            <Icon name={iconName} size={36} color="white" />
          </LinearGradient>
        </View>
      ))}
    </View>
  );
};

export default Category;
