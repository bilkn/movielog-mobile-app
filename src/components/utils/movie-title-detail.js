import React from "react";
import { View, Text } from "react-native";
import { Rate, Typography } from "..";

const MovieTitleDetail = (props) => {
  const { align, title, releaseYear, genres, style } = props;
  return (
    <View style={{ alignItems: align || "flex-start", ...style }}>
      <Typography variant="title">{title}</Typography>
      <Typography variant="textSmall" style={{ marginTop: 5, fontWeight: '300' }}>
        {`${releaseYear} | ${genres.map(
          (genre, i) => `${i !== 0 ? ", " : ""}${genre}`
        )}`}
      </Typography>
      <Rate value={4} readonly />
    </View>
  );
};

export default MovieTitleDetail;
