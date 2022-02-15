import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "..";
import api from "../../api";
import MAPPINGS from "../../constants/mappings";
import { useMovieOperationSuccess } from "./useAddMovieToTheList";

export default function useRemoveMovieFromTheList() {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient()

  const handleMovieOperationSuccess = useMovieOperationSuccess();
  return useMutation(
    ([list, movieID]) =>
      api.removeMovieFromTheList(axiosInstance, list, movieID),
    {
      onSuccess: () => handleMovieOperationSuccess(),
      onMutate: async ([list, movieID]) => {
        await queryClient.cancelQueries();
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
          return previousMovieDetail;
        }
      },
    }
  );
}
