import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { MovieList, Typography } from "../components";
import { useListLogic } from "../hooks";

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
  const { listTab, handlers } = useListLogic();
  const { handleTabChange } = handlers;

  return (
    <>
      <ListTabs listTab={listTab} onTabChange={handleTabChange} />
      {listTab.watchList && (
        <MovieList
          emptyListMessage="Your movie watch list is empty."
          navigation={navigation}
          listName="watchList"
        />
      )}
      {listTab.watchedList && (
        <MovieList
          emptyListMessage="Your movie watched list is empty."
          navigation={navigation}
          listName="watchedList"
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
