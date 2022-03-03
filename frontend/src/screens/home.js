import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Category,
  FeaturedList,
  Form,
  MainLayout,
  Typography,
} from "../components";
import useHomeLogic from "../hooks/screens/useHomeLogic";

const commonHeadingStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  width: "100%",
};

const styles = StyleSheet.create({
  heading: {
    ...commonHeadingStyle,
  },
  featuredHeading: {
    marginTop: 30,
    ...commonHeadingStyle,
  },
});

const lightTitleProps = { style: { fontWeight: "300" }, variant: "titleLight" };

const Home = ({ navigation }) => {
  const { featuredMovies, isLoading, username, searchQuery, handlers } =
    useHomeLogic();
  const { handleSearchQueryChange, resetSearchQuery } = handlers;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainLayout style={{ marginBottom: 0 }}>
        <View style={styles.heading}>
          <Typography variant="title">Hello </Typography>
          <Typography {...lightTitleProps}>{username}!</Typography>
        </View>
        <View style={{ marginTop: 20 }}>
          <Form.Searchbox
            value={searchQuery}
            onChangeText={(value) => handleSearchQueryChange(value)}
            style={{ marginBottom: 20 }}
            onCancelPress={resetSearchQuery}
          />
        </View>
        <Typography
          style={{
            alignItems: "flex-start",
            marginTop: 30,
            width: "100%",
          }}
          variant="subtitle"
        >
          Categories
        </Typography>
      </MainLayout>
      <Category navigation={navigation} />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.featuredHeading}>
          <Typography variant="title">Featured </Typography>
          <Typography {...lightTitleProps}>Movies</Typography>
        </View>
      </View>
      <FeaturedList
        featuredMovies={featuredMovies}
        navigation={navigation}
        isLoading={isLoading}
      />
    </ScrollView>
  );
};

export default Home;
