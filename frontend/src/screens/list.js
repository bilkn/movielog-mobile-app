import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, VirtualizedList, Pressable } from "react-native";
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

const ListTabs = (props) => {
  const { list, changeTab } = props;
  const { colors } = useTheme();
  return (
    <View
      style={{ ...styles.listTabContainer, borderColor: colors.primaryBorder }}
    >
      <Pressable style={styles.tab} onPress={() => changeTab("showWatchList")}>
        <Typography
          color={list.showWatchList ? colors.ternary : colors.text}
          variant="subtitle"
        >
          Watch List
        </Typography>
      </Pressable>
      <Pressable
        style={styles.tab}
        onPress={() => changeTab("showWatchedList")}
      >
        <Typography
          color={list.showWatchedList ? colors.ternary : colors.text}
          variant="subtitle"
        >
          Watched List
        </Typography>
      </Pressable>
    </View>
  );
};

const initialListValues = {
  showWatchList: true,
  showWatchedList: false,
};

const List = ({ navigation }) => {
  const [list, setList] = useState(initialListValues);
  const changeTab = (tab) => {
    setList({ showWatchList: false, showWatchedList: false, [tab]: true });
  };

  const MovieCardRenderItem = (props) => {
    const { item: movie, index: i, navigation } = props;
    return (
      <MovieCardItem
        key={i}
        movie={movie}
        navigation={navigation}
        extraComponent={
          list.showWatchList ? (
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
    <>
      <ListTabs list={list} changeTab={changeTab} />
      <MainLayout noMargin>
        <VirtualizedList
          showsVerticalScrollIndicator={false}
          data={mockMovies}
          initialNumToRender={4}
          style={styles.list}
          renderItem={({ item }) => (
            <MovieCardRenderItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.key}
          getItemCount={() => mockMovies.length}
          getItem={getItem}
          contentInset={{ bottom: 60 }}
        />
      </MainLayout>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: 30,
    width: "100%",
  },
  listTabContainer: {
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  tab: {
    paddingVertical: 15,
  },
});

export default List;
