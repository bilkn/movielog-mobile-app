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
              onPress={() => removeMovieFromTheList(["watchList", movie.id])}
            />
            <IconButton
              icon={<Icon name="checkbox-plus" size={22} />}
              disabled={addMovieLoading || removeMovieLoading}
              onPress={() => addMovieToTheList(["watchedList", movie.id])}
              style={{ marginLeft: 20 }}
            />
          </View>
        ) : (
          <>
            <IconButton active icon={<Icon name="checkbox-plus" size={22} />} />
            <View style={{ marginLeft: 10 }}>
              <Typography style={{ fontSize: 12 }}>Watch date:</Typography>
              <Moment
                element={Typography}
                date={movie.watchDate}
                format="DD/MM/YYYY"
              />
            </View>
          </>
        )
      }
      style={{ marginTop: i !== 0 ? 30 : 0 }}
    />
  );
};

export default MovieCardRenderItem;
