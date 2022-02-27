import React from "react";
import { View } from "react-native";
import { Rate, Typography } from "..";

const MovieTitleDetail = (props) => {
  const {
    align,
    title,
    releaseYear,
    genres,
    rating,
    style,
    textAlign = "left",
    titleProps = {},
  } = props;
  return (
    <View
      style={{
        alignItems: align || "flex-start",
        ...style,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Typography
          style={{ flex: 1, flexWrap: "wrap", textAlign }}
          variant="title"
          {...titleProps}
        >
          {title}
        </Typography>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Typography
          variant="textSmall"
          style={{
            flex: 1,
            flexWrap: "wrap",
            marginTop: 5,
            fontWeight: "300",
            textAlign,
          }}
        >
          {releaseYear}
          {" | "}
          {genres
            ? genres?.map(
                (genre, i, arr) =>
                  `${genre.name}${
                    arr.length > 1 && i !== arr.length - 1 ? ", " : ""
                  }`
              )
            : "Unknown genre"}
        </Typography>
      </View>
      <Rate value={rating / 2} readonly />
    </View>
  );
};

export default MovieTitleDetail;
