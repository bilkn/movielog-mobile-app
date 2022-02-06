import React from "react";
import { View, Text } from "react-native";
import { Rate, Typography } from "..";

const MovieTitleDetail = (props) => {
  const { align, title, releaseYear, genres, rating, style, textAlign='left' } = props;
  return (
    <View
      style={{
        alignItems: align || "flex-start",
        ...style,
      }}
    >
      <Typography style={{ textAlign }} variant="title">
        {title}
      </Typography>
      <Typography
        variant="textSmall"
        style={{ marginTop: 5, fontWeight: "300", textAlign }}
      >
        {releaseYear}
        {" | "}
        {genres?.map(
          (genre, i, arr) =>
            `${genre.name}${arr.length > 1 && i !== arr.length - 1 ? ", " : ""}`
        )}
      </Typography>
      <Rate value={rating / 2} readonly />
    </View>
  );
};

export default MovieTitleDetail;
