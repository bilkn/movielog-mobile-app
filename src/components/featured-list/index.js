import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import Poster1 from "../../assets/mock/poster-1.jpg";
import Poster2 from "../../assets/mock/poster-2.jpg";
import Poster3 from "../../assets/mock/poster-3.jpg";
import Carousel from "react-native-snap-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

const { width: screenWidth } = Dimensions.get("window");

const movies = [
  {
    id: 0,
    poster: Poster1,
  },
  {
    id: 1,
    poster: Poster2,
  },
  {
    id: 2,
    poster: Poster3,
  },
];

const Card = ({ item }) => {
  return (
    <Pressable style={styles.cardButton}>
      <ImageBackground
        source={item.poster}
        resizeMode="contain"
        style={styles.cardBackground}
        imageStyle={styles.cardImage}
      />
    </Pressable>
  );
};

const FeaturedList = () => {
  const carouselRef = useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={movies}
        renderItem={Card}
        itemHeight={250}
        sliderWidth={screenWidth}
        itemWidth={170}
      />
    </SafeAreaView>
  );
};

export default FeaturedList;
