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
      style={index === items.length - 1 ? { borderBottomWidth: 0 } : {}}
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
      onEndReached={onEndReached}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  listTab: {
    paddingBottom: 60,
    width: "100%",
  },
});

export default CustomFlatList;
