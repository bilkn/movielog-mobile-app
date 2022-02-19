import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "..";
import api from "../../api";
import MAPPINGS from "../../constants/mappings";
import {
  handleMovieMutationError,
  handleMovieMutationSettled,
  handleUserListMutation,
  handleWatchListMutation,
} from "./useAddMovieToTheList";

const handleMovieDetailRemoveMutation = (queryClient, list, movieID) => {
  const { data: previousMovieDetail } =
    queryClient.getQueryData("movieDetail") || {};

  if (previousMovieDetail?.id === movieID) {
    queryClient.setQueryData("movieDetail", (oldQueryData) => {
      return {
        data: {
          ...oldQueryData.data,
          [MAPPINGS.watchDataByList[list]]: false,
        },
      };
    });
    return { prevData: { data: previousMovieDetail } };
  }
};
const handleSearchMovieListRemoveMutation = (queryClient, list, movieID) => {
  const { data: previousMovieData } =
    queryClient.getQueryData("searchMovieList") || {};

  queryClient.setQueryData("searchMovieList", (oldQueryData) => {
    return {
      data: oldQueryData.data.map((item) =>
        item.id === movieID
          ? {
              ...item,
              [MAPPINGS.watchDataByList[list]]: false,
            }
          : item
      ),
    };
  });
  return {
    prevData: { data: previousMovieData },
  };
};

export default function useRemoveMovieFromTheList(options) {
  const { cacheKey } = options;
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation(
    ([list, movieID]) =>
      api.removeMovieFromTheList(axiosInstance, list, movieID),
    {
      onMutate: async ([list, movieID]) => {
        await queryClient.cancelQueries();

        if (cacheKey === "movieDetail") {
          return handleMovieDetailRemoveMutation(queryClient, list, movieID);
        }

        if (cacheKey === "searchMovieList") {
          return handleSearchMovieListRemoveMutation(
            queryClient,
            list,
            movieID
          );
        }
        if (cacheKey === "watchList" || cacheKey === "watchedList") {
          return handleUserListMutation(queryClient, movieID, cacheKey);
        }
      },
      onError: (...errorParams) =>
        handleMovieMutationError({ errorParams, queryClient, cacheKey }),
      onSettled: () => handleMovieMutationSettled(queryClient, cacheKey),
    }
  );
}
