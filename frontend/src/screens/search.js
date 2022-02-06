import React from "react";
import { FlatList } from "react-native";
import {
  Form,
  IconButton,
  MainLayout,
  MovieCardItem,
  Typography,
} from "../components";
import { Icon } from "../assets/icon";
import useSearchLogic from "../hooks/screens/useSearchLogic";

const MovieCardRenderItem = (props) => {
  const { item: movie, index: i, navigation } = props;
  return (
    <MovieCardItem
      key={i}
      movie={movie}
      navigation={navigation}
      style={{ marginTop: i !== 0 ? 30 : 0 }}
      extraComponent={
        <>
          <IconButton icon={<Icon name="movie-open-check" size={22} />} />
          <IconButton
            icon={<Icon name="checkbox-plus" size={22} />}
            style={{ marginLeft: 20 }}
          />
        </>
      }
    />
  );
};

const Search = ({ navigation }) => {
  const { handlers, formikValues, movies, featuredMovies, isLoading } =
    useSearchLogic();
  const { handleSearchQueryChange, handleReachList } = handlers;

  return (
    <MainLayout>
      <Form.Searchbox
        value={formikValues.searchQuery}
        onChangeText={(value) => handleSearchQueryChange(value)}
        style={{ marginBottom: 30 }}
      />
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <FlatList
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={movies || featuredMovies}
          initialNumToRender={4}
          renderItem={({ item }) => (
            <MovieCardRenderItem item={item} navigation={navigation} />
          )}
          contentInset={{ bottom: 60 }}
          onEndReached={handleReachList}
        />
      )}
    </MainLayout>
  );
};

export default Search;
