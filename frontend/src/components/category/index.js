import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { Typography } from "..";
import { Icon } from "../../assets/icon";
import { SCREENS } from "../../constants/screens";

const genres = [
  {
    name: "Action",
    value: "28",
    iconName: "gun",
  },
  {
    name: "Adventure",
    value: "12",
    iconName: "compass",
  },
  {
    name: "Crime",
    value: "80",
    iconName: "handcuffs",
  },
  {
    name: "Comedy",
    value: "35",
    iconName: "happy-face",
  },
  {
    name: "Drama",
    value: "18",
    iconName: "drama-masks",
  },
  {
    name: "Horror",
    value: "27",
    iconName: "ghost",
  },
  {
    name: "Romance",
    value: "10749",
    iconName: "rose",
  },
  {
    name: "Sci-fi",
    value: "878",
    iconName: "alien",
  },
];

const Card = ({ item, i, onCardPress }) => {
  const { colors } = useTheme();
  const { name, iconName } = item;

  return (
    <Pressable
      onPress={onCardPress}
      style={({ pressed }) => ({
        ...styles.cardContainer,
        opacity: pressed ? 0.8 : 1,
        marginLeft: i === 0 ? 0 : 15,
      })}
    >
      <Typography variant="textSmall">{name}</Typography>
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

const Category = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {genres.map((genre, i) => (
        <Card
          onCardPress={() =>
            navigation.navigate(SCREENS.MOVIES_BY_GENRE, {
              genre: genre.name,
              genreID: genre.value,
            })
          }
          key={genre.name}
          item={genre}
          i={i}
        />
      ))}
    </ScrollView>
  );
};

export default Category;
