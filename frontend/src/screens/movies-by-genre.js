import React from "react";
import { MainLayout, MovieList } from "../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../api";
import useMoviesByGenreLogic from "../hooks/screens/useMoviesByGenreLogic";

const MoviesByGenre = () => {
  const { params, navigation } = useMoviesByGenreLogic();
  const { genre, genreID } = params;

  return (
    <MovieList
      emptyListMessage=""
      navigation={navigation}
      listName="moviesByGenre"
      queryFn={(instance, query) =>
        api.getMoviesByGenre(instance, query, { genre, genreID })
      }
    />
  );
};

export default MoviesByGenre;
