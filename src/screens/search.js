import React from "react";
import { View, VirtualizedList } from "react-native";
import { Form, IconButton, MainLayout, MovieCardItem } from "../components";
import { Icon } from "../assets/icon";
import { ScrollView } from "react-native-gesture-handler";
import { mockMovies } from "../mock/movies";

const getItem = (data, index) => {
  return {
    id: index,
    ...data[index],
  };
};

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
  return (
    <MainLayout>
      <Form.Searchbox style={{ marginBottom: 30 }} />
      <VirtualizedList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={mockMovies}
        initialNumToRender={4}
        renderItem={({ item }) => (
          <MovieCardRenderItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.key}
        getItemCount={() => mockMovies.length}
        getItem={getItem}
        contentInset={{ bottom: 60 }}
      />
    </MainLayout>
  );
};

export default Search;
