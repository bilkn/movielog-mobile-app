import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useAxios } from "..";
import api from "../../api";

// TODO: Refactor this file.
function useMovieDetailLogic({ route }) {
  const { axiosInstance } = useAxios();
  const { params } = route;
  const { movieID } = params || {};
  const [watched, setWatched] = useState(false);
  const [willWatch, setWillWatch] = useState(false);

  const getMovieDetailRequest = () => axiosInstance.get(`/${movieID}`);

  const { data: { data: movieDetail } = {}, isLoading } = useQuery(
    "movieDetail",
    getMovieDetailRequest
  );

  const { isLoading: addMovieLoading, mutate: addMovieToTheList } = useMutation(
    (list) => api.addMovieToTheList(axiosInstance, list, movieID),
    {
      onSuccess: ({ data: { data: booleanWatch } = {} }) => {
        if (booleanWatch.watched) {
          setWatched(true)
          return setWillWatch(false);
        }
        if (booleanWatch.willWatch) {
          setWillWatch(true);
          setWatched(false);
        }
      },
    }
  );

  const { isLoading: removeMovieLoading, mutate: removeMovieFromTheList } =
    useMutation(
      (list) => api.removeMovieFromTheList(axiosInstance, list, movieID),
      {
        onSuccess: ({ data: { data: booleanWatch } = {} }) => {
          if (booleanWatch.watched === false) {
            return setWatched(false);
          }
          if (booleanWatch.willWatch === false) {
            setWillWatch(false);
          }
        },
      }
    );

  const handleWatchListButtonPress = () => {
    if (!willWatch) {
      return addMovieToTheList("watchList");
    }
    removeMovieFromTheList("watchList");
  };

  const handleWatchedListButtonPress = () => {
    if (!watched) {
      return addMovieToTheList("watchedList");
    }
    removeMovieFromTheList("watchedList");
  };

  const handlers = {
    handleWatchListButtonPress,
    handleWatchedListButtonPress,
  };

  useEffect(() => {
    if (movieDetail?.watched) setWatched(true);
    if (movieDetail?.willWatch) setWillWatch(true);
  }, [movieDetail]);

  return {
    movieDetail,
    isLoading,
    handlers,
    isOperationLoading: addMovieLoading || removeMovieLoading,
    watched,
    willWatch,
  };
}

export default useMovieDetailLogic;
