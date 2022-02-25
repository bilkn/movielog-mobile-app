import React from "react";
import { MainLayout, MovieList } from "../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../api";

const MoviesByGenre = () => {
  const navigation = useNavigation();
  const {
    params: { genre },
  } = useRoute();
  return (
    <MainLayout>
      <MovieList
        emptyListMessage=""
        navigation={navigation}
        listName="moviesByGenre"
        queryFn={(instance, query) =>
          api.getMoviesByGenre(instance, query, { genre })
        }
      />
    </MainLayout>
  );
};

export default MoviesByGenre;
