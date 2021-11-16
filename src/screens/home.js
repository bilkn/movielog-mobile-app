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
  return (
    <ScrollView>
      <MainLayout>
        <View style={styles.heading}>
          <Typography variant="title">Hello </Typography>
          <Typography {...lightTitleProps}>Bilkan!</Typography>
        </View>
        <View style={{ marginTop: 20 }}>
          <Form.Searchbox />
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
        <Category />
        <View style={styles.featuredHeading}>
          <Typography variant="title">Featured </Typography>
          <Typography {...lightTitleProps}>Movies</Typography>
        </View>
        <FeaturedList navigation={navigation} />
      </MainLayout>
    </ScrollView>
  );
};

export default Home;
