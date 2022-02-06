import React from "react";
import { Image, Pressable, View } from "react-native";
import { useMovieCardItemLogic } from "../../../hooks";
import MovieTitleDetail from "../movie-title-detail";
import { styles } from "./styles";

const MovieCardItem = (props) => {
  const { movie, extraComponent, style, navigation } = props;
  const { title, releaseYear, genres, poster, id, rating } = movie;
  const { handlers } = useMovieCardItemLogic({ navigation });
  const { handleCardPress } = handlers;

  return (
    <View style={{ ...styles.container, marginTop: 30, ...style }}>
      <Pressable onPress={() => handleCardPress(id)}>
        <Image
          style={styles.image}
          source={{
            uri: `${process.env.REACT_APP_POSTER_API_URL}/w200${poster}`,
          }}
        />
      </Pressable>
      <View style={styles.content}>
        <MovieTitleDetail
          title={title}
          releaseYear={releaseYear}
          genres={genres}
          rating={rating}
          titleProps={{ numberOfLines: 2 }}
        />
        {extraComponent ? (
          <View style={styles.controlsContainer}>{extraComponent}</View>
        ) : null}
      </View>
    </View>
  );
};

export default MovieCardItem;
