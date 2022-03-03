import React from "react";
import {
  CustomFlatList,
  Form,
  IconButton,
  MainLayout,
  MovieCardItem,
  MovieCardSkeletonList,
  Spinner,
  Typography,
} from "../components";
import { Icon } from "../assets/icon";
import useSearchLogic from "../hooks/screens/useSearchLogic";
import { useAddMovieToTheList, useRemoveMovieFromTheList } from "../hooks";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

const MovieCardRenderItem = (props) => {
  const {
    item: movie,
    index: i,
    navigation,
    cacheKey,
    searchQuery,
    style,
  } = props;
  const { id, watched, willWatch } = movie;

  const { isLoading: addMovieLoading, mutate: addMovieToTheList } =
    useAddMovieToTheList({ cacheKey, searchQuery });

  const { isLoading: removeMovieLoading, mutate: removeMovieFromTheList } =
    useRemoveMovieFromTheList({ cacheKey, searchQuery });

  return (
    <MovieCardItem
      movie={movie}
      navigation={navigation}
      style={{ marginTop: i !== 0 ? 30 : 0, ...style }}
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
            disabled={addMovieLoading || removeMovieLoading}
          />
          <IconButton
            active={watched}
            icon={<Icon name="checkbox-plus" size={22} />}
            onPress={
              watched
                ? () => removeMovieFromTheList(["watchedList", id])
                : () => addMovieToTheList(["watchedList", id])
            }
            disabled={addMovieLoading || removeMovieLoading}
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
    searchedMovies,
    featuredMovies,
    isLoading,
    isFetchingNextPage,
    debouncedSearchQuery,
    genre,
  } = useSearchLogic();
  const { handleSearchQueryChange, handleReachList, resetSearchQuery } =
    handlers;
  const { colors } = useTheme();

  return (
    <>
      <MainLayout style={{ marginTop: 20, marginBottom: 0 }}>
        {!!genre && (
          <View style={{ marginBottom: 10, width: "100%" }}>
            <Typography
              color={colors.secondary}
              style={{
                textTransform: "capitalize",
                textAlign: "left",
                fontSize: "22px",
              }}
              variant="title"
            >
              {genre} Movies
            </Typography>
          </View>
        )}
        <Form.Searchbox
          value={formikValues.searchQuery}
          onChangeText={(value) => handleSearchQueryChange(value)}
          style={{ marginBottom: 20 }}
          onCancelPress={resetSearchQuery}
        />
      </MainLayout>
      {isLoading ? (
        <MovieCardSkeletonList style={{ marginTop: 0 }} />
      ) : searchedMovies?.length ||
        (featuredMovies?.length && !debouncedSearchQuery) ? (
        <CustomFlatList
          items={searchedMovies || featuredMovies}
          onEndReached={handleReachList}
          style={{ paddingTop: 0 }}
          renderItem={({ index, item }) => (
            <MovieCardRenderItem
              item={item}
              index={index}
              navigation={navigation}
              searchQuery={debouncedSearchQuery}
              style={
                index === searchedMovies?.length - 1 ||
                index === featuredMovies?.length - 1
                  ? { borderBottomWidth: 0 }
                  : {}
              }
              cacheKey={
                !!searchedMovies?.length
                  ? "searchMovieList"
                  : "featuredMovieList"
              }
            />
          )}
        />
      ) : (
        <Typography
          variant="text"
          style={{ marginTop: 35, textAlign: "center" }}
        >
          Your search for "{debouncedSearchQuery}" did not have any matches.
        </Typography>
      )}
      {isFetchingNextPage && <Spinner />}
    </>
  );
};

export default Search;
