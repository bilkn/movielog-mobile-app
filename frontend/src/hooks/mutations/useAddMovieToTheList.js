import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "..";
import api from "../../api";
import MAPPINGS from "../../constants/mappings";

export const handleMovieMutationSettled = (queryClient) => {
  queryClient.invalidateQueries();
};

export const handleMovieMutationError = ({
  errorParams: { 2: context },
  queryClient,
  cacheKey,
}) => {
  if (context.prevData) {
    return queryClient.setQueryData(cacheKey, context.prevData);
  }
  queryClient.invalidateQueries();
};

const handleMovieDetailAddMutation = (queryClient, list) => {
  const { data: previousMovieDetail } =
    queryClient.getQueryData("movieDetail") || {};

  queryClient.setQueryData("movieDetail", (oldQueryData) => {
    return {
      data: {
        ...oldQueryData.data,
        [MAPPINGS.watchDataByList[list]]: true,
        [MAPPINGS.watchDataByListReversed[list]]: false,
      },
    };
  });
  return { prevData: { data: previousMovieDetail } };
};

const handleFeaturedMovieListAddMutation = (queryClient, list, movieID) => {
  const { data: previousMovieData } =
    queryClient.getQueryData("featuredMovieList") || {};

  queryClient.setQueryData("featuredMovieList", (oldQueryData) => {
    return {
      data: oldQueryData.data.map((item) =>
        item.id === movieID
          ? {
              ...item,
              [MAPPINGS.watchDataByList[list]]: true,
              [MAPPINGS.watchDataByListReversed[list]]: false,
            }
          : item
      ),
    };
  });
  return {
    prevData: { data: previousMovieData },
  };
};

export const handleUserListMutation = (queryClient, movieID, cacheKey) => {
  queryClient.setQueryData(cacheKey, (oldQueryData) => {
    return {
      pages: oldQueryData.pages.map(({ data: { items } }) => ({
        data: { items: items.filter((movie) => movie.id !== movieID) },
      })),
    };
  });
};

const handleMovieListAddMutation = ({ queryClient, list, movieID, query }) => {
  queryClient.setQueriesData(query, (oldQueryData) => {
    return {
      pages: oldQueryData.pages.map(({ data: { items, ...rest } }) => ({
        data: {
          items: items.map((movie) =>
            movie.id === movieID
              ? {
                  ...movie,
                  [MAPPINGS.watchDataByList[list]]: true,
                  [MAPPINGS.watchDataByListReversed[list]]: false,
                }
              : movie
          ),
          ...rest,
        },
      })),
    };
  });
};

export default function useAddMovieToTheList(options) {
  const { cacheKey, searchQuery = "" } = options;
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation(
    ([list, movieID]) => {
      return api.addMovieToTheList(axiosInstance, list, movieID);
    },
    {
      onMutate: async ([list, movieID]) => {
        await queryClient.cancelQueries();

        if (cacheKey === "movieDetail") {
          return handleMovieDetailAddMutation(queryClient, list);
        }
        if (cacheKey === "featuredMovieList") {
          return handleFeaturedMovieListAddMutation(queryClient, list, movieID);
        }
        if (cacheKey === "watchList" || cacheKey === "watchedList") {
          return handleUserListMutation(queryClient, movieID, cacheKey);
        }

        if (cacheKey === "searchMovieList") {
          return handleMovieListAddMutation({
            queryClient,
            list,
            movieID,
            query: [cacheKey, { searchQuery }],
          });
        }
        if (cacheKey === "moviesByGenre") {
          return handleMovieListAddMutation({
            queryClient,
            list,
            movieID,
            query: cacheKey,
          });
        }
      },
      onError: (...errorParams) =>
        handleMovieMutationError({ errorParams, queryClient, cacheKey }),
      onSettled: () => handleMovieMutationSettled(queryClient),
    }
  );
}
