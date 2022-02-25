import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { Typography } from "..";
import { Icon } from "../../assets/icon";
import { SCREENS } from "../../constants/screens";

const categoryList = [
  {
    genre: "Action",
    value: "28",
    iconName: "gun",
  },
  {
    genre: "Adventure",
    value: "12",
    iconName: "compass",
  },
  {
    genre: "Crime",
    value: "80",
    iconName: "handcuffs",
  },
  {
    genre: "Comedy",
    value: "35",
    iconName: "happy-face",
  },
  {
    genre: "Drama",
    value: "18",
    iconName: "drama-masks",
  },
  {
    genre: "Horror",
    value: "27",
    iconName: "ghost",
  },
  {
    genre: "Romance",
    value: "10749",
    iconName: "rose",
  },
  {
    genre: "Sci-fi",
    value: "878",
    iconName: "alien",
  },
];

const Card = ({ item, i, onCardPress }) => {
  const { colors } = useTheme();
  const { genre, iconName } = item;

  return (
    <Pressable
      onPress={onCardPress}
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

const Category = ({ navigation }) => {
  console.log({ navigation });
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categoryList.map((item, i) => (
        <Card
          onCardPress={() =>
            navigation.navigate(SCREENS.MOVIES_BY_GENRE, {
              genre: item.value,
            })
          }
          key={item.genre}
          item={item}
          i={i}
        />
      ))}
    </ScrollView>
  );
};

export default Category;
