import { MotiView } from "moti";
import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Icon } from "../assets/icon";
import NoAvatar from "../assets/no-avatar.png";
import {
  DelayedSkeleton,
  IconButton,
  MainLayout,
  MovieTitleDetail,
  NoPoster,
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
    marginTop: 15,
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
    width: "100%",
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
   /*  width: "100%", */
  },
});

const ActorCard = (props) => {
  const { profile, name, style } = props;

  return (
    <View style={{ ...styles.smallCard, ...style, backgroundColor: "#22232D" }}>
      <Image
        source={
          profile
            ? {
                uri: `${process.env.REACT_APP_POSTER_API_URL}/w200${profile}`,
              }
            : NoAvatar
        }
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
  const { movieDetail, handlers, isOperationLoading, isLoading } =
    useMovieDetailLogic({
      route,
    });

  const { addMovieToTheList, removeMovieFromTheList } = handlers;

  const {
    id,
    cast,
    overview,
    title,
    releaseYear,
    genres,
    poster,
    rating,
    willWatch,
    watched,
  } = movieDetail || {};

  const Spacer = ({ height = 8 }) => <MotiView style={{ height }} />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainLayout style={{ marginBottom: 0 }}>
        <View style={styles.container}>
          {isLoading ? (
            <DelayedSkeleton radius={20} height={290} width={195} />
          ) : poster ? (
            <Image
              style={styles.poster}
              source={{
                uri: `${process.env.REACT_APP_POSTER_API_URL}/w300${poster}`,
              }}
            />
          ) : (
            <NoPoster style={styles.poster} fontVariant="subtitle" />
          )}

          <View style={styles.controls}>
            <View
              style={{
                position: "relative",
                left: 30,
              }}
            >
              {isLoading ? (
                <View style={{ position: "relative", left: 10 }}>
                  <DelayedSkeleton radius={"round"} height={40} width={40} />
                </View>
              ) : (
                <IconButton
                  active={willWatch}
                  icon={<Icon name="movie-open-check" size={22} />}
                  onPress={
                    willWatch
                      ? () => removeMovieFromTheList(["watchList", id])
                      : () => addMovieToTheList(["watchList", id])
                  }
                  disabled={isOperationLoading}
                />
              )}
            </View>
            {isLoading ? (
              <View
                style={{
                  alignItems: "center",

                  width: "100%",
                }}
              >
                <DelayedSkeleton radius={10} height={15} width={150} />
                <Spacer />
                <DelayedSkeleton radius={10} height={15} width={120} />
                <Spacer />
                <DelayedSkeleton radius={10} height={10} width={120} />
              </View>
            ) : (
              <MovieTitleDetail
                align="center"
                title={title}
                releaseYear={releaseYear}
                genres={genres}
                rating={rating}
                style={styles.titleDetail}
                textAlign="center"
              />
            )}

            <View
              style={{
                position: "relative",
                right: 30,
              }}
            >
              {isLoading ? (
                <View style={{ position: "relative", right: 10 }}>
                  <DelayedSkeleton radius={"round"} height={40} width={40} />
                </View>
              ) : (
                <IconButton
                  active={watched}
                  icon={<Icon name="checkbox-plus" size={22} />}
                  onPress={
                    watched
                      ? () => removeMovieFromTheList(["watchedList", id])
                      : () => addMovieToTheList(["watchedList", id])
                  }
                  disabled={isOperationLoading}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={{ width: "100%" }}>
            {isLoading ? (
              <DelayedSkeleton height={20} width={120} />
            ) : (
              <Typography variant="subtitle">Description</Typography>
            )}
            {isLoading ? (
              <>
                <Spacer />
                <DelayedSkeleton height={20} width={"100%"} />
                <Spacer />
                <DelayedSkeleton height={20} width={"100%"} />
                <Spacer />
                <DelayedSkeleton height={20} width={"100%"} />
              </>
            ) : (
              <Typography variant="body" style={{ marginTop: 10 }}>
                {overview}
              </Typography>
            )}
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            {isLoading ? (
              <DelayedSkeleton height={20} width={120} />
            ) : (
              <Typography variant="subtitle">Cast</Typography>
            )}
          </View>
        </View>
      </MainLayout>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.castContainer}
      >
        {isLoading ? (
          <>
            <View>
              <DelayedSkeleton radius={15} height={125} width={100} />
            </View>
            <View style={{ marginLeft: 25 }}>
              <DelayedSkeleton radius={15} height={125} width={100} />
            </View>
            <View style={{ marginLeft: 25 }}>
              <DelayedSkeleton radius={15} height={125} width={100} />
            </View>
          </>
        ) : (
          cast?.map((actor, i) => (
            <ActorCard
              key={actor.name}
              {...actor}
              style={{ marginLeft: i !== 0 ? 25 : 0 }}
            />
          ))
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default MovieDetail;
