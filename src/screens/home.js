import axios from "axios";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { Category, MainLayout, Typography } from "../components";
import { API_TOKEN } from "@env";

const Home = () => {
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");

  console.log(data);
  const handlePress = () => {
    setMessage("Loading...");
    axios
      .get(`https://api.themoviedb.org/3/movie/550?api_key=${API_TOKEN}`)
      .then(({ data }) => setData(data));
  };

  return (
    <MainLayout>
      <Text style={{ color: "white" }}>{message}</Text>
      <Typography variant="title">
        HOME PAGE
        <Pressable onPress={handlePress}>
          <Text style={{ color: "white" }}>Get movies</Text>
        </Pressable>
      </Typography>
      <Text>{JSON.stringify(data)}</Text>
      <Category />
    </MainLayout>
  );
};

export default Home;
