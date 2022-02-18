import { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import api from "../../api";
import { useAxios } from "../../hooks";

function useMovieListLogic(options) {
  const { listName } = options;
  const { axiosInstance } = useAxios();
  const {
    data: { pages } = {},
    fetchNextPage,
    refetch,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(
    listName,
    (query) => api.getMovieList(axiosInstance, listName, query),
    {
      getNextPageParam: (lastPage) => {
        const { pagination } = lastPage?.data || {};
        const { totalPages = 1, currentPage } = pagination || {};
        return currentPage < totalPages ? +currentPage + 1 : undefined;
      },
      onSuccess: () => console.log("refetch"),
    }
  );

  const movieList = useMemo(
    () =>
      pages
        ?.map((group) => {
          return group.data.items;
        })
        .flat() || [],
    [pages]
  );

  const handleReachList = () => {
    console.log("Handle reach list.");
    fetchNextPage();
  };

  const handlers = {
    handleReachList,
  };

  return { handlers, movieList, isLoading, isFetchingNextPage };
}

export default useMovieListLogic;
