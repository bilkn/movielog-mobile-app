import { QueryClient, useMutation, useQueryClient } from "react-query";
import { useAxios } from "..";
import api from "../../api";
import MAPPINGS from "../../constants/mappings";

export const useMovieOperationSuccess = () => {
  const queryClient = useQueryClient();
  return () => {
    // TODO: Prevent refetch, use setQueryData.
    /*     queryClient.invalidateQueries("movieList");
    queryClient.invalidateQueries("featuredMovies");
    queryClient.invalidateQueries("watchList");
    queryClient.invalidateQueries("watchedList"); */
  };
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

export default function useAddMovieToTheList(options) {
  const { cacheKey } = options;
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  const handleMovieOperationSuccess = useMovieOperationSuccess();
  return useMutation(
    ([list, movieID]) => {
      return api.addMovieToTheList(axiosInstance, list, movieID);
    },
    {
      onSuccess: ({ data }) => handleMovieOperationSuccess(data),
      onMutate: async ([list, movieID]) => {
        await queryClient.cancelQueries();

        if (cacheKey === "movieDetail") {
          return handleMovieDetailAddMutation(queryClient, list);
        }
        if (cacheKey === "searchMovieList") {
          return handleSearchMovieListAddMutation(queryClient, list, movieID);
        }
      },
      onError: (_err, _var, context) => {
        queryClient.setQueryData(cacheKey, context.prevData);
        console.log("ERROR");
      },
      onSettled: () => {
        queryClient.invalidateQueries(cacheKey);

        if (cacheKey !== "watchList" && cacheKey !== "watchedList") {
          queryClient.invalidateQueries("watchList");
          queryClient.invalidateQueries("watchedList");
        }
      },
    }
  );
}
