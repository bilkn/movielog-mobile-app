import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import api from "../../api";
import { useAxios } from "../../hooks";

function useMovieListLogic(options) {
  const { listName, queryFn } = options;
  const { axiosInstance } = useAxios();
  const {
    data: { pages } = {},
    fetchNextPage,
    isLoading,
    isFetched,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    listName,
    (query) =>
      queryFn
        ? queryFn(axiosInstance, query)
        : api.getMovieList(axiosInstance, listName, query),
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
    () => pages?.map((group) => group.data.items).flat() || [],
    [pages]
  );

  const handleReachList = () => {
    console.log("Handle reach list.");
    hasNextPage && fetchNextPage();
  };

  const handlers = {
    handleReachList,
  };

  return { handlers, movieList, isLoading, isFetchingNextPage, isFetched };
}

export default useMovieListLogic;
