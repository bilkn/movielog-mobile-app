import React from "react";
import { useQuery } from "react-query";
import { useAxios } from "..";

function useHomeLogic() {
  const { axiosInstance } = useAxios();

  const getFeaturedMoviesRequest = () => {
    return axiosInstance.get("/featured");
  };

  const { data: { data: featuredMovies } = [], isLoading } = useQuery(
    "featuredMovies",
    getFeaturedMoviesRequest
  );

  return { featuredMovies, isLoading };
}

export default useHomeLogic;
