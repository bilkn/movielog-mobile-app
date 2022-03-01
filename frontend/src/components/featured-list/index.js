import React, { useRef, useState } from "react";
import { Dimensions, Pressable, ImageBackground } from "react-native";
import Carousel from "react-native-snap-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { SCREENS } from "../../constants/screens";
import { MovieCardSkeleton } from "..";

const { width: screenWidth } = Dimensions.get("window");

const Card = ({ item, navigation }) => {
  const handleCardPress = () => {
    navigation.navigate(SCREENS.MOVIE_DETAIL, { movieID: item.id });
  };
  /*   const [isImageLoading, setIsImageLoading] = useState(true); */

  return (
    <Pressable onPress={handleCardPress} style={styles.cardButton}>
      <ImageBackground
        source={{
          uri: `${process.env.REACT_APP_POSTER_API_URL}/w300${item.poster}`,
        }}
        resizeMode="contain"
        style={styles.cardBackground}
        imageStyle={styles.cardImage}
      />
    </Pressable>
  );
};

const FeaturedList = (props) => {
  const { featuredMovies, navigation, isLoading } = props;
  const carouselRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        loop
        autoplay
        autoplayDelay={5000}
        autoplayInterval={5000}
        ref={carouselRef}
        data={featuredMovies}
        renderItem={({ item }) =>
          isLoading ? (
            <MovieCardSkeleton />
          ) : (
            <Card item={item} navigation={navigation} />
          )
        }
        itemHeight={250}
        sliderWidth={screenWidth}
        itemWidth={170}
      />
    </SafeAreaView>
  );
};

export default FeaturedList;
