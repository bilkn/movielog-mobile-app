
import { useQuery } from "react-query";
import {
  useAddMovieToTheList,
  useRemoveMovieFromTheList,
  useAxios,

} from "..";

function useMovieDetailLogic({ route }) {
  const { axiosInstance } = useAxios();
  const { isLoading: addMovieLoading, mutate: addMovieToTheList } =
    useAddMovieToTheList({ cacheKey: "movieDetail" });
  const { isLoading: removeMovieLoading, mutate: removeMovieFromTheList } =
    useRemoveMovieFromTheList({ cacheKey: "movieDetail" });

  const { params } = route;
  const { movieID } = params || {};

  const getMovieDetailRequest = () => {
    console.log("AXIOS INSTANCE", movieID);
    return axiosInstance.get(`/${movieID}`);
  };

  const { data: { data: movieDetail } = {}, isLoading } = useQuery(
    "movieDetail",
    getMovieDetailRequest,
    {
      onSuccess: () => console.log("AGAIN AND AGAIN"),
    }
  );

  const handlers = {
    addMovieToTheList,
    removeMovieFromTheList,
  };

  return {
    movieDetail,
    isLoading,
    handlers,
    isOperationLoading: removeMovieLoading || addMovieLoading,
  };
}

export default useMovieDetailLogic;
