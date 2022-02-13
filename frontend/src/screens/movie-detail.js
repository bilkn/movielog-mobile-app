import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Icon } from "../assets/icon";
import {
  IconButton,
  MainLayout,
  MovieTitleDetail,
  Typography,
} from "../components";
import useMovieDetailLogic from "../hooks/screens/useMovieDetailLogic";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  controls: {
    flexDirection: "row",
    marginTop: 10,
  },
  carouselContainer: {
    width: "100%",
  },
  titleDetail: {
    marginHorizontal: 40,
    flexBasis: "70%",
  },
  poster: {
    borderRadius: 20,
    height: 290,
    width: 195,
  },
  contentContainer: {
    marginTop: 30,
  },
  smallCard: {
    borderRadius: 15,
    overflow: "hidden",
    width: 108,
  },
  castContainer: {
    paddingLeft: 20,
    marginBottom: 30,
    marginTop: 20,
    maxHeight: 150,
  },
});

const ActorCard = (props) => {
  const { profile, name, style } = props;

  return (
    <View style={{ ...styles.smallCard, ...style, backgroundColor: "#22232D" }}>
      <Image
        source={{
          uri: `${process.env.REACT_APP_POSTER_API_URL}/w200${profile}`,
        }}
        style={{ height: "75%", resizeMode: "cover", width: "100%" }}
        progressiveRenderingEnabled
      />
      <View
        style={{
          alignItems: "center",
          height: "25%",
          justifyContent: "center",
        }}
      >
        <Typography variant="textSmall" style={{ textAlign: "center" }}>
          {name}
        </Typography>
      </View>
    </View>
  );
};

const MovieDetail = ({ route }) => {
  const {
    movieDetail,
    handlers,
    isLoading,
    isOperationLoading,
    watched,
    willWatch,
  } = useMovieDetailLogic({
    route,
  });
  // TODO: Add skeleton if data is loading.
  if (isLoading) return <Typography>Loading...</Typography>;

  const { handleWatchListButtonPress, handleWatchedListButtonPress } = handlers;

  const { cast, overview, title, releaseYear, genres, poster, rating } =
    movieDetail;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainLayout style={{ marginBottom: 0 }}>
        <View style={styles.container}>
          <Image
            style={styles.poster}
            source={{
              uri: `${process.env.REACT_APP_POSTER_API_URL}/w300${poster}`,
            }}
          />
          <View style={styles.controls}>
            <View
              style={{
                position: "relative",
                left: 30,
              }}
            >
              <IconButton
                active={willWatch}
                icon={<Icon name="movie-open-check" size={22} />}
                onPress={handleWatchListButtonPress}
                loading={isOperationLoading}
              />
            </View>
            <MovieTitleDetail
              align="center"
              title={title}
              releaseYear={releaseYear}
              genres={genres}
              rating={rating}
              style={styles.titleDetail}
              textAlign="center"
            />
            <View
              style={{
                position: "relative",
                right: 30,
              }}
            >
              <IconButton
                active={watched}
                icon={<Icon name="checkbox-plus" size={22} />}
                onPress={handleWatchedListButtonPress}
                loading={isOperationLoading}
              />
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Typography variant="subtitle">Description</Typography>
            <Typography variant="body" style={{ marginTop: 10 }}>
              {overview}
            </Typography>
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Typography variant="subtitle">Cast</Typography>
          </View>
        </View>
      </MainLayout>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.castContainer}
      >
        {cast.map((actor, i) => (
          <ActorCard
            key={actor.name}
            {...actor}
            style={{ marginLeft: i !== 0 ? 25 : 0 }}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default MovieDetail;
