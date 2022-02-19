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
          const { data: previousMovieDetail } =
            queryClient.getQueryData("movieDetail") || {};
          // TODO: Add operations for other cache keys too.
          console.log(previousMovieDetail);

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
        }
      },
      onError: (_err, _var, context) => {
        console.log(cacheKey);
        queryClient.setQueryData(cacheKey, context.prevData);
        console.log("ERROR");
      },
      onSettled: () => {
        console.log("SETTLED");
        queryClient.invalidateQueries(cacheKey);
      },
    }
  );
}
