import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { MovieCardRenderItem } from "..";

function CustomFlatList(props) {
  const {
    items,
    navigation,
    listName,
    onEndReached,
    renderItem,
    style,
    ...rest
  } = props;

  const renderItemFn = ({ index, item }) => (
    <MovieCardRenderItem
      index={index}
      listName={listName}
      item={item}
      navigation={navigation}
    />
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={items}
      initialNumToRender={4}
      style={{ ...styles.listTab, ...style }}
      keyExtractor={(item) => item.id}
      renderItem={renderItem || renderItemFn}
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
