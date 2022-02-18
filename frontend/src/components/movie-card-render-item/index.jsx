import React from "react";
import Moment from "react-moment";
import { View } from "react-native";
import { IconButton, MovieCardItem, Typography } from "..";
import { Icon } from "../../assets/icon";

const MovieCardRenderItem = (props) => {
  const { item: movie, index: i, navigation, listName } = props;
  return (
    <MovieCardItem
      key={i}
      movie={movie}
      navigation={navigation}
      extraComponent={
        listName === "watchList" ? (
          <IconButton
            active
            icon={<Icon name="movie-open-check" size={22} />}
          />
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
