import { useMutation } from "react-query";
import { useAxios } from "..";
import api from "../../api";
import { useMovieOperationSuccess } from "./useAddMovieToTheList";

export default function useRemoveMovieFromTheList() {
  const { axiosInstance } = useAxios();

  const handleMovieOperationSuccess = useMovieOperationSuccess();
  return useMutation(
    ([list, movieID]) =>
      api.removeMovieFromTheList(axiosInstance, list, movieID),
    {
      onSuccess: ({ data }) => handleMovieOperationSuccess(data),
    }
  );
}
