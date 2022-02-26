import { isLoading } from "expo-font";
import React from "react";
import Moment from "react-moment";
import { View } from "react-native";
import { IconButton, MovieCardItem, Typography } from "..";
import { Icon } from "../../assets/icon";
import { useAddMovieToTheList, useRemoveMovieFromTheList } from "../../hooks";

const MovieCardRenderItem = (props) => {
  const { item: movie, index: i, navigation, listName } = props;
  const { isLoading: addMovieLoading, mutate: addMovieToTheList } =
    useAddMovieToTheList({ cacheKey: listName });
  const { isLoading: removeMovieLoading, mutate: removeMovieFromTheList } =
    useRemoveMovieFromTheList({ cacheKey: listName });

  const { id, willWatch, watched, watchDate } = movie;

  return (
    <MovieCardItem
      key={i}
      movie={movie}
      navigation={navigation}
      extraComponent={
        listName === "watchList" ? (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <IconButton
              active
              icon={<Icon name="movie-open-check" size={22} />}
              disabled={addMovieLoading || removeMovieLoading}
              onPress={() => removeMovieFromTheList(["watchList", id])}
            />
            <IconButton
              icon={<Icon name="checkbox-plus" size={22} />}
              disabled={addMovieLoading || removeMovieLoading}
              onPress={() => addMovieToTheList(["watchedList", id])}
              style={{ marginLeft: 20 }}
            />
          </View>
        ) : listName === "watchedList" ? (
          <>
            <IconButton
              active
              icon={<Icon name="checkbox-plus" size={22} />}
              onPress={() => removeMovieFromTheList(["watchedList", id])}
            />
            <View style={{ marginLeft: 10 }}>
              <Typography style={{ fontSize: 12 }}>Watch date:</Typography>
              <Moment
                element={Typography}
                date={watchDate}
                format="DD/MM/YYYY"
              />
            </View>
          </>
        ) : (
          <>
            <IconButton
              active={willWatch}
              icon={<Icon name="movie-open-check" size={22} />}
              onPress={
                willWatch
                  ? () => removeMovieFromTheList(["watchList", id])
                  : () => addMovieToTheList(["watchList", id])
              }
              disabled={addMovieLoading || removeMovieLoading}
            />
            <IconButton
              active={watched}
              icon={<Icon name="checkbox-plus" size={22} />}
              onPress={
                watched
                  ? () => removeMovieFromTheList(["watchedList", id])
                  : () => addMovieToTheList(["watchedList", id])
              }
              disabled={addMovieLoading || removeMovieLoading}
              style={{ marginLeft: 20 }}
            />
          </>
        )
      }
      style={{ marginTop: i !== 0 ? 30 : 0 }}
    />
  );
};

export default MovieCardRenderItem;
