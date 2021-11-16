import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "../assets/icon";
import {
  IconButton,
  MainLayout,
  MovieCardItem,
  Typography,
} from "../components";
import { mockMovies } from "../mock/movies";

const List = () => {
  const [list, setList] = useState({
    showWatchlist: true,
    showWatched: false,
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainLayout>
        <View style={styles.list}>
          {mockMovies.map((movie, i) => (
            <MovieCardItem
              key={i}
              movie={movie}
              extraComponent={
                list.showWatchlist ? (
                  <IconButton
                    icon={<Icon name="movie-open-check" size={22} />}
                  />
                ) : (
                  <>
                    <IconButton
                      icon={<Icon name="checkbox-plus" size={22} />}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Typography style={{ fontSize: 12 }}>
                        Watch date:
                      </Typography>
                      <Typography style={{ fontSize: 12 }}>
                        10/01/2021
                      </Typography>
                    </View>
                  </>
                )
              }
              style={{ marginTop: i !== 0 ? 30 : 0 }}
            />
          ))}
        </View>
      </MainLayout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
});

export default List;
