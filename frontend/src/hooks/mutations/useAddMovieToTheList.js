import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "..";
import api from "../../api";

export const useMovieOperationSuccess = () => {
  const queryClient = useQueryClient();
  return (data) => {
    queryClient.setQueryData("movieDetail", (oldQueryData) => {
      return {
        data: { ...oldQueryData.data, ...data.data },
      };
    });
    // TODO: Prevent refetch, use setQueryData.
    queryClient.invalidateQueries("movieList");
    queryClient.invalidateQueries("featuredMovies");
    queryClient.invalidateQueries("watchList");
    queryClient.invalidateQueries("watchedList");
  };
};

export default function useAddMovieToTheList() {
  const { axiosInstance } = useAxios();
  const handleMovieOperationSuccess = useMovieOperationSuccess();
  return useMutation(
    ([list, movieID]) => {
      return api.addMovieToTheList(axiosInstance, list, movieID);
    },
    {
      onSuccess: ({ data }) => handleMovieOperationSuccess(data),
    }
  );
}
