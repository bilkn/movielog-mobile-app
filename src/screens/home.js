import axios from "axios";
import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { Category, MainLayout, Typography } from "../components";
import { API_TOKEN } from "@env";

const Home = () => {
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");

  return (
    <MainLayout>
      <Typography
        style={{
          alignItems: "flex-start",
          width: "100%",
        }}
        variant="subtitle"
      >
        Categories
      </Typography>
      <Text>{JSON.stringify(data)}</Text>
      <Category />
    </MainLayout>
  );
};

export default Home;
