import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "..";
import api from "../../api";
import MAPPINGS from "../../constants/mappings";

export const useMovieOperationSuccess = () => {
  const queryClient = useQueryClient();
  return () => {
    // TODO: Prevent refetch, use setQueryData.
    queryClient.invalidateQueries("movieList");
    queryClient.invalidateQueries("featuredMovies");
    queryClient.invalidateQueries("watchList");
    queryClient.invalidateQueries("watchedList");
  };
};

export default function useAddMovieToTheList() {
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
        const { data: previousMovieDetail } =
          queryClient.getQueryData("movieDetail") || {};

        if (previousMovieDetail?.id === movieID) {
          queryClient.setQueryData("movieDetail", (oldQueryData) => {
            return {
              data: {
                ...oldQueryData.data,
                [MAPPINGS.watchDataByList[list]]: true,
                [MAPPINGS.watchDataByListReversed[list]]: false,
              },
            };
          });
          return previousMovieDetail;
        }
      },
      onError: (_err, _var, context) => {
        queryClient.setQueryData("movie");
      },
    }
  );
}
