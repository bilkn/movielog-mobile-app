import React from "react";
import { useQuery } from "react-query";
import { useAxios } from "..";
import api from "../../api";

function useHomeLogic() {
  const { axiosInstance } = useAxios();

  const getFeaturedMoviesRequest = () => {
    return axiosInstance.get("/featured");
  };

  const { data: { data: featuredMovies } = [], isLoading } = useQuery(
    "featuredMovies",
    getFeaturedMoviesRequest
  );

  const { data: { data: { username } = {} } = {} } = useQuery("user", () =>
    api.getUserInfoRequest(axiosInstance)
  );

  return { featuredMovies, isLoading,username };
}

export default useHomeLogic;
