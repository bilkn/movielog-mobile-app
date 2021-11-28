import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { Typography } from "..";
import { Icon } from "../../assets/icon";

const categoryList = [
  {
    genre: "Action",
    iconName: "gun",
  },
  {
    genre: "Adventure",
    iconName: "compass",
  },
  {
    genre: "Crime",
    iconName: "handcuffs",
  },
  {
    genre: "Comedy",
    iconName: "happy-face",
  },
  {
    genre: "Drama",
    iconName: "drama-masks",
  },
  {
    genre: "Horror",
    iconName: "ghost",
  },
  {
    genre: "Romantic",
    iconName: "rose",
  },
  {
    genre: "Sci-fi",
    iconName: "alien",
  },
];

const Card = ({ item, i }) => {
  const { colors } = useTheme();
  const { genre, iconName } = item;

  return (
    <Pressable
      style={({ pressed }) => ({
        ...styles.cardContainer,
        opacity: pressed ? 0.8 : 1,
        marginLeft: i === 0 ? 0 : 15,
      })}
    >
      <Typography variant="textSmall">{genre}</Typography>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 360, y: 360 }}
        colors={["rgba(255, 255, 255, 0.20)", "rgba(255, 255, 255, 0.21)"]}
        style={styles.card}
      >
        <Icon name={iconName} size={36} color={colors.text} />
      </LinearGradient>
    </Pressable>
  );
};

const Category = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categoryList.map((item, i) => (
        <Card key={item.genre} item={item} i={i} />
      ))}
    </ScrollView>
  );
};

export default Category;
