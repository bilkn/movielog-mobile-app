import React, { useState } from "react";
import { View, Text, StyleSheet, VirtualizedList } from "react-native";
import { Icon } from "../assets/icon";
import {
  IconButton,
  MainLayout,
  MovieCardItem,
  Typography,
} from "../components";
import { mockMovies } from "../mock/movies";

const getItem = (data, index) => {
  return {
    id: index,
    ...data[index],
  };
};

const List = () => {
  const [list, setList] = useState({
    showWatchlist: true,
    showWatched: false,
  });

  const MovieCardRenderItem = (props) => {
    const { item: movie, index: i } = props;
    return (
      <MovieCardItem
        key={i}
        movie={movie}
        extraComponent={
          list.showWatchlist ? (
            <IconButton icon={<Icon name="movie-open-check" size={22} />} />
          ) : (
            <>
              <IconButton icon={<Icon name="checkbox-plus" size={22} />} />
              <View style={{ marginLeft: 10 }}>
                <Typography style={{ fontSize: 12 }}>Watch date:</Typography>
                <Typography style={{ fontSize: 12 }}>10/01/2021</Typography>
              </View>
            </>
          )
        }
        style={{ marginTop: i !== 0 ? 30 : 0 }}
      />
    );
  };

  return (
    <MainLayout noMargin>
      <VirtualizedList
        showsVerticalScrollIndicator={false}
        data={mockMovies}
        initialNumToRender={4}
        style={styles.list}
        renderItem={MovieCardRenderItem}
        keyExtractor={(item) => item.key}
        getItemCount={() => mockMovies.length}
        getItem={getItem}
        contentInset={{ bottom: 60 }}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: 30,
    width: "100%",
  },
});

export default List;
