import React from "react";
import { Image, Pressable, View } from "react-native";
import MovieTitleDetail from "../movie-title-detail";
import { styles } from "./styles";

const MovieCardItem = (props) => {
  const { movie, extraComponent, style } = props;
  const { title, releaseYear, genres, poster } = movie;
  return (
    <View style={{ ...styles.container, marginTop: 30, ...style }}>
      <Pressable>
        <Image style={styles.image} source={poster} />
      </Pressable>
      <View style={styles.content}>
        <MovieTitleDetail
          title={title}
          releaseYear={releaseYear}
          genres={genres}
        />
        {extraComponent ? (
          <View style={styles.controlsContainer}>{extraComponent}</View>
        ) : null}
      </View>
    </View>
  );
};

export default MovieCardItem;
