import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Form, IconButton, MainLayout, MovieTitleDetail } from "../components";
import Poster from "../assets/mock/poster-1.jpg";
import { Icon } from "../assets/icon";
import { ScrollView } from "react-native-gesture-handler";

const movies = [
  {
    title: "Dredd",
    releaseYear: "2021",
    genres: ["Action", "Crime"],
    poster: Poster,
  },
  {
    title: "Dredd",
    releaseYear: "2021",
    genres: ["Action", "Crime"],
    poster: Poster,
  },
  {
    title: "Dredd",
    releaseYear: "2021",
    genres: ["Action", "Crime"],
    poster: Poster,
  },
  {
    title: "Dredd",
    releaseYear: "2021",
    genres: ["Action", "Crime"],
    poster: Poster,
  },
  {
    title: "Dredd",
    releaseYear: "2021",
    genres: ["Action", "Crime"],
    poster: Poster,
  },
];

const movieCardStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },

  image: {
    borderRadius: 10,
    height: 162,
    width: 110,
  },
  content: {
    marginLeft: 24,
  },
  controlsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
});

const MovieCard = (props) => {
  const { movie } = props;
  const { title, releaseYear, genres } = movie;
  return (
    <View style={{ ...movieCardStyles.container, marginTop: 30 }}>
      <Pressable>
        <Image style={movieCardStyles.image} source={Poster} />
      </Pressable>
      <View style={movieCardStyles.content}>
        <MovieTitleDetail
          title={title}
          releaseYear={releaseYear}
          genres={genres}
        />
        <View style={movieCardStyles.controlsContainer}>
          <IconButton icon={<Icon name="movie-open-check" size="22" />} />
          <IconButton
            icon={<Icon name="checkbox-plus" size="22" />}
            style={{ marginLeft: 20 }}
          />
        </View>
      </View>
    </View>
  );
};

const Search = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainLayout>
        <Form.Searchbox />
        <View style={{ width: "100%" }}>
          {movies.map((movie,i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </View>
      </MainLayout>
    </ScrollView>
  );
};

export default Search;
