import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "..";
import api from "../../api";
import MAPPINGS from "../../constants/mappings";
import { useMovieOperationSuccess } from "./useAddMovieToTheList";

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
const handleSearchMovieListAddMutation = (queryClient, list, movieID) => {
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

  const handleMovieOperationSuccess = useMovieOperationSuccess();
  return useMutation(
    ([list, movieID]) =>
      api.removeMovieFromTheList(axiosInstance, list, movieID),
    {
      onSuccess: () => handleMovieOperationSuccess(),
      onMutate: async ([list, movieID]) => {
        await queryClient.cancelQueries();

        if (cacheKey === "movieDetail") {
          return handleMovieDetailRemoveMutation(queryClient, list, movieID);
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
