import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { MovieCardRenderItem } from "..";

function CustomFlatList(props) {
  const { items, navigation, listName, onEndReached, ...rest } = props;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={items}
      initialNumToRender={4}
      style={styles.listTab}
      keyExtractor={(item) => item.key}
      renderItem={({ index, item }) => (
        <MovieCardRenderItem
          index={index}
          listName={listName}
          item={item}
          navigation={navigation}
        />
      )}
      contentInset={{ bottom: 60 }}
      onEndReached={onEndReached}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  listTab: {
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 20,
    width: "100%",
  },
});

export default CustomFlatList;
