import React from "react";
import { useQuery } from "react-query";
import { useAxios } from "..";

function useMovieDetailLogic({ route }) {
  const { axiosInstance } = useAxios();
  const { params } = route;
  const { movieID } = params || {};

  const getMovieDetailRequest = () => axiosInstance.get(`/${movieID}`);

  const { data: { data: movieDetail } = {}, isLoading } = useQuery(
    "movieDetail",
    getMovieDetailRequest
  );

  return { movieDetail, isLoading };
}

export default useMovieDetailLogic;
