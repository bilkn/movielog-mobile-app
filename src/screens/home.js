import React from "react";
import { Category, MainLayout, Typography } from "../components";

const Home = () => {

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
      <Category />
    </MainLayout>
  );
};

export default Home;
