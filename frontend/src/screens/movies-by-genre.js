import React from "react";
import { MovieList } from "../components";
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
