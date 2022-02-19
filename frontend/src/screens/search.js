import React from "react";
import {
  CustomFlatList,
  Form,
  IconButton,
  MainLayout,
  MovieCardItem,
  MovieCardSkeletonList,
  Spinner,
} from "../components";
import { Icon } from "../assets/icon";
import useSearchLogic from "../hooks/screens/useSearchLogic";
import { useAddMovieToTheList, useRemoveMovieFromTheList } from "../hooks";

const MovieCardRenderItem = (props) => {
  const { item: movie, index: i, navigation } = props;
  const { id, watched, willWatch } = movie;

  const { isLoading: addMovieLoading, mutate: addMovieToTheList } =
    useAddMovieToTheList({ cacheKey: "searchMovieList" });

  const { isLoading: removeMovieLoading, mutate: removeMovieFromTheList } =
    useRemoveMovieFromTheList({ cacheKey: "searchMovieList" });

  return (
    <MovieCardItem
      movie={movie}
      navigation={navigation}
      style={{ marginTop: i !== 0 ? 30 : 0 }}
      extraComponent={
        <>
          <IconButton
            active={willWatch}
            icon={<Icon name="movie-open-check" size={22} />}
            onPress={
              willWatch
                ? () => removeMovieFromTheList(["watchList", id])
                : () => addMovieToTheList(["watchList", id])
            }
          />
          <IconButton
            active={watched}
            icon={<Icon name="checkbox-plus" size={22} />}
            onPress={
              watched
                ? () => removeMovieFromTheList(["watchedList", id])
                : () => addMovieToTheList(["watchedList", id])
            }
            style={{ marginLeft: 20 }}
          />
        </>
      }
    />
  );
};

const Search = ({ navigation }) => {
  const {
    handlers,
    formikValues,
    movies,
    featuredMovies,
    isLoading,
    isFetchingNextPage,
  } = useSearchLogic();
  const { handleSearchQueryChange, handleReachList } = handlers;

  return (
    <>
      <MainLayout style={{ marginBottom: 0 }}>
        <Form.Searchbox
          value={formikValues.searchQuery}
          onChangeText={(value) => handleSearchQueryChange(value)}
          style={{ marginBottom: 30 }}
        />
      </MainLayout>
      {isLoading ? (
        <MovieCardSkeletonList />
      ) : (
        <CustomFlatList
          items={movies || featuredMovies}
          onEndReached={handleReachList}
          style={{ paddingTop: 0 }}
          renderItem={({ index, item }) => (
            <MovieCardRenderItem
              item={item}
              index={index}
              navigation={navigation}
            />
          )}
        />
      )}
      {isFetchingNextPage && <Spinner />}
    </>
  );
};

export default Search;
