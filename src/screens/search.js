import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import {
  Form,
  IconButton,
  MainLayout,
  MovieCardItem,
} from "../components";
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

const Search = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainLayout>
        <Form.Searchbox />
        <View style={{ width: "100%" }}>
          {movies.map((movie, i) => (
            <MovieCardItem
              key={i}
              movie={movie}
              extraComponent={
                <>
                  <IconButton
                    icon={<Icon name="movie-open-check" size="22" />}
                  />
                  <IconButton
                    icon={<Icon name="checkbox-plus" size="22" />}
                    style={{ marginLeft: 20 }}
                  />
                </>
              }
            />
          ))}
        </View>
      </MainLayout>
    </ScrollView>
  );
};

export default Search;
