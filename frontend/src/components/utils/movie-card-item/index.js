import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { Typography } from "../..";
import { useMovieCardItemLogic } from "../../../hooks";
import MovieTitleDetail from "../movie-title-detail";
import { styles } from "./styles";

const MovieCardItem = (props) => {
  const { movie, extraComponent, style, navigation } = props;
  const { title, releaseYear, genres, poster, id, rating } = movie;
  const { handlers } = useMovieCardItemLogic({ navigation });
  const { handleCardPress } = handlers;
  const { colors } = useTheme();

  const NoPoster = () => (
    <View
      style={{
        alignItems: "center",
        backgroundColor: colors.gray2,
        justifyContent: "center",
        ...styles.image,
      }}
    >
      <Typography>No Poster</Typography>
      <Typography>Avaliable</Typography>
    </View>
  );

  return (
    <View
      style={{
        ...styles.container,
        marginTop: 30,
        borderBottomWidth: 1,
        borderColor: "rgba(81, 83, 93, 0.4)",
        paddingHorizontal: 20,
        paddingVertical: 15,
        ...style,
        marginTop: 0,
      }}
    >
      <Pressable onPress={() => handleCardPress(id)}>
        {poster ? (
          <Image
            style={styles.image}
            source={{
              uri: `${process.env.REACT_APP_POSTER_API_URL}/w200${poster}`,
            }}
          />
        ) : (
          <NoPoster />
        )}
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
