import React from "react";
import { CustomFlatList, Spinner, MovieCardSkeletonList, Typography } from "..";
import useMovieListLogic from "./useMovieListLogic";

function MovieList(props) {
  const { listName, navigation, emptyListMessage, queryFn } = props;
  const { movieList, handlers, isFetchingNextPage, isLoading, isFetched } =
    useMovieListLogic({ listName, queryFn });
  const { handleReachList } = handlers;

  if (isFetched && !movieList.length) {
    return (
      <Typography variant="text" style={{ marginTop: 35, textAlign: "center" }}>
        {emptyListMessage}
      </Typography>
    );
  }

  console.log({movieList});

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
