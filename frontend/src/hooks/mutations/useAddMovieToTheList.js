import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "..";
import api from "../../api";
import MAPPINGS from "../../constants/mappings";

export const handleMovieMutationSettled = (queryClient, cacheKey) => {
  queryClient.invalidateQueries(cacheKey);

  if (cacheKey !== "watchList" && cacheKey !== "watchedList") {
    queryClient.invalidateQueries("watchList");
    queryClient.invalidateQueries("watchedList");
  }
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
  // TODO: Add operations for other cache keys too.

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

const handleSearchMovieListAddMutation = (queryClient, list, movieID) => {
  const { data: previousMovieData } =
    queryClient.getQueryData("searchMovieList") || {};

  queryClient.setQueryData("searchMovieList", (oldQueryData) => {
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

export default function useAddMovieToTheList(options) {
  const { cacheKey } = options;
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
        if (cacheKey === "searchMovieList") {
          return handleSearchMovieListAddMutation(queryClient, list, movieID);
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
