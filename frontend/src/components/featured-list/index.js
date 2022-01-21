import React, { useRef } from "react";
import { Dimensions, Pressable, ImageBackground } from "react-native";
import Poster1 from "../../assets/mock/poster-1.jpg";
import Poster2 from "../../assets/mock/poster-2.jpg";
import Poster3 from "../../assets/mock/poster-3.jpg";
import Carousel from "react-native-snap-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { SCREENS } from "../../constants/screens";
import { mockFeaturedMovies } from "../../mock/movies";

const { width: screenWidth } = Dimensions.get("window");

const Card = ({ item, navigation }) => {
  const handleCardPress = () => {
    navigation.navigate(SCREENS.MOVIE_DETAIL);
  };
  return (
    <Pressable onPress={handleCardPress} style={styles.cardButton}>
      <ImageBackground
        source={item.poster}
        resizeMode="contain"
        style={styles.cardBackground}
        imageStyle={styles.cardImage}
      />
    </Pressable>
  );
};

const FeaturedList = ({ navigation }) => {
  const carouselRef = useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        loop
        autoplay
        autoplayDelay={5000}
        autoplayInterval={5000}
        ref={carouselRef}
        data={mockFeaturedMovies}
        renderItem={({ item }) => <Card item={item} navigation={navigation} />}
        itemHeight={250}
        sliderWidth={screenWidth}
        itemWidth={170}
      />
    </SafeAreaView>
  );
};

export default FeaturedList;
