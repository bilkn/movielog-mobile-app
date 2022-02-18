import React from "react";
import { CustomFlatList, Spinner, MovieCardSkeletonList } from "..";
import useMovieListLogic from "./useMovieListLogic";

function MovieList(props) {
  const { listName, navigation } = props;
  const { movieList, handlers, isFetchingNextPage, isLoading } =
    useMovieListLogic({ listName });
  const { handleReachList } = handlers;

  return (
    <>
      {isLoading ? (
        <MovieCardSkeletonList />
      ) : (
        <CustomFlatList
          listName={listName}
          items={movieList}
          navigation={navigation}
          onEndReached={handleReachList}
        />
      )}
      {isFetchingNextPage && <Spinner />}
    </>
  );
}

export default MovieList;
