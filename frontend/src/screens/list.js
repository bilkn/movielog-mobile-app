import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  VirtualizedList,
  Pressable,
  FlatList,
} from "react-native";
import { Icon } from "../assets/icon";
import { IconButton, MovieCardItem, Typography } from "../components";
import { useListLogic } from "../hooks";
import { MovieCardSkeletonList } from "./search";
import Moment from "react-moment";

const ListTabs = (props) => {
  const { listTab, onTabChange } = props;
  const { colors } = useTheme();

  return (
    <View
      style={{ ...styles.listTabContainer, borderColor: colors.primaryBorder }}
    >
      <Pressable style={styles.tab} onPress={() => onTabChange("watchList")}>
        <Typography
          color={listTab.watchList ? colors.ternary : colors.text}
          variant="subtitle"
        >
          Watch List
        </Typography>
      </Pressable>
      <Pressable style={styles.tab} onPress={() => onTabChange("watchedList")}>
        <Typography
          color={listTab.watchedList ? colors.ternary : colors.text}
          variant="subtitle"
        >
          Watched List
        </Typography>
      </Pressable>
    </View>
  );
};

const List = ({ navigation }) => {
  const { listTab, watchList, watchedList, handlers, isLoading } =
    useListLogic();
  const { handleTabChange, handleReachList } = handlers;

  const MovieCardRenderItem = (props) => {
    const { item: movie, index: i, navigation } = props;
    return (
      <MovieCardItem
        key={i}
        movie={movie}
        navigation={navigation}
        extraComponent={
          listTab.watchList ? (
            <IconButton
              active
              icon={<Icon name="movie-open-check" size={22} />}
            />
          ) : (
            <>
              <IconButton
                active
                icon={<Icon name="checkbox-plus" size={22} />}
              />
              <View style={{ marginLeft: 10 }}>
                <Typography style={{ fontSize: 12 }}>Watch date:</Typography>
                <Moment
                  element={Typography}
                  date={movie.watchDate}
                  format="DD/MM/YYYY"
                />
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
      <ListTabs listTab={listTab} onTabChange={handleTabChange} />
      {isLoading ? (
        <MovieCardSkeletonList />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listTab.watchList ? watchList : watchedList}
          initialNumToRender={4}
          style={styles.listTab}
          renderItem={({ item, index }) => (
            <MovieCardRenderItem
              index={index}
              item={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.key}
          contentInset={{ bottom: 60 }}
          onEndReached={handleReachList}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listTab: {
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 20,
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
