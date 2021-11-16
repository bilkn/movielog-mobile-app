import React from "react";
import { View } from "react-native";
import { Form, IconButton, MainLayout, MovieCardItem } from "../components";
import { Icon } from "../assets/icon";
import { ScrollView } from "react-native-gesture-handler";
import { mockMovies } from "../mock/movies";

const Search = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainLayout>
        <Form.Searchbox />
        <View style={{ width: "100%" }}>
          {mockMovies.map((movie, i) => (
            <MovieCardItem
              key={i}
              movie={movie}
              extraComponent={
                <>
                  <IconButton
                    icon={<Icon name="movie-open-check" size="22" />}
                  />
                  <IconButton
                    icon={<Icon name="checkbox-plus" size="22" />}
                    style={{ marginLeft: 20 }}
                  />
                </>
              }
            />
          ))}
        </View>
      </MainLayout>
    </ScrollView>
  );
};

export default Search;
