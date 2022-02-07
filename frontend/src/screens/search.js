import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import {
  Form,
  IconButton,
  MainLayout,
  MovieCardItem,
  MovieCardItemSkeleton,
} from "../components";
import { Icon } from "../assets/icon";
import useSearchLogic from "../hooks/screens/useSearchLogic";
import { CircleFade } from "react-native-animated-spinkit";

const MovieCardSkeletonList = () => {
  return (
    <ScrollView
      style={{ paddingHorizontal: 20, width: "100%" }}
      contentInset={{ bottom: 60 }}
    >
      {Array.from(new Array(5)).map((_, i) => (
        <View key={i} style={{ marginTop: i !== 0 ? 30 : 0 }}>
          <MovieCardItemSkeleton />
        </View>
      ))}
    </ScrollView>
  );
};

const MovieCardRenderItem = (props) => {
  const { item: movie, index: i, navigation } = props;

  return (
    <MovieCardItem
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
        <FlatList
          keyExtractor={({ id }) => id}
          style={{ paddingHorizontal: 20, width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={movies || featuredMovies}
          initialNumToRender={4}
          renderItem={({ item, index }) => (
            <MovieCardRenderItem
              item={item}
              index={index}
              navigation={navigation}
            />
          )}
          contentInset={{ bottom: 60 }}
          onEndReached={handleReachList}
        />
      )}
      {isFetchingNextPage && (
        <View style={{ alignItems: "center", paddingVertical: 10 }}>
          <CircleFade color="white" size={30} />
        </View>
      )}
    </>
  );
};

export default Search;
