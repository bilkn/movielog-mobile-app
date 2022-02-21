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
const handleFeaturedMovieList = (queryClient, list, movieID) => {
  const { data: previousMovieData } =
    queryClient.getQueryData("featuredMovieList") || {};

  queryClient.setQueryData("featuredMovieList", (oldQueryData) => {
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

const handleSearchMovideListRemoveMutation = ({
  queryClient,
  list,
  movieID,
  searchQuery,
}) => {
  queryClient.setQueriesData(
    ["searchMovieList", { searchQuery }],
    (oldQueryData) => {
      return {
        pages: oldQueryData.pages.map(({ data: { items, ...rest } }) => ({
          data: {
            items: items.map((movie) =>
              movie.id === movieID
                ? {
                    ...movie,
                    [MAPPINGS.watchDataByList[list]]: false,
                  }
                : movie
            ),
            ...rest,
          },
        })),
      };
    }
  );
};

export default function useRemoveMovieFromTheList(options) {
  const { cacheKey, searchQuery = "" } = options;
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

        if (cacheKey === "featuredMovieList") {
          return handleFeaturedMovieList(queryClient, list, movieID);
        }
        if (cacheKey === "watchList" || cacheKey === "watchedList") {
          return handleUserListMutation(queryClient, movieID, cacheKey);
        }

        if (cacheKey === "searchMovieList") {
          return handleSearchMovideListRemoveMutation({
            queryClient,
            list,
            movieID,
            searchQuery,
          });
        }
      },
      onError: (...errorParams) =>
        handleMovieMutationError({ errorParams, queryClient, cacheKey }),
      onSettled: () =>
        handleMovieMutationSettled(queryClient, cacheKey, searchQuery),
    }
  );
}
