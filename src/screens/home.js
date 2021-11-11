import React from "react";
import { StyleSheet, View } from "react-native";
import { Category, Form, MainLayout, Typography } from "../components";

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
});

const Home = () => {
  return (
    <MainLayout>
      <View style={styles.heading}>
        <Typography variant="title">Hello </Typography>
        <Typography style={{ fontWeight: "300" }} variant="titleLight">
          Bilkan!
        </Typography>
      </View>
      <Form.Searchbox />
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
    </MainLayout>
  );
};

export default Home;
