import { useFormik } from "formik";
import React, { useCallback, useEffect, useMemo } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useAxios } from "..";
import { useDebounce } from "use-debounce";
import api from "../../api";

function useSearchLogic() {
  const { axiosInstance } = useAxios();
  const { values, handleChange } = useFormik({
    initialValues: {
      searchQuery: "",
    },
  });

  const [debouncedSearchQuery] = useDebounce(values.searchQuery, 1000);

  const getMoviesBySearchQueryRequest = (query) => {
    console.log("request");
    const { queryKey, pageParam = 1 } = query;
    console.log("PAGE PARAM", pageParam);
    const [_, { searchQuery }] = queryKey;
    return axiosInstance.get(`/search/?q=${searchQuery}&page=${pageParam}`);
  };

  const {
    data: { pages } = {},
    isLoading,
    refetch: getMoviesBySearchQuery,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["movieList", { searchQuery: values.searchQuery }],
    getMoviesBySearchQueryRequest,
    {
      getNextPageParam: (lastPage) => {
        const { total_pages = 1, page } = lastPage?.data || {};
        console.log("TOTAL PAGES", total_pages, "CURRENT PAGE", page);
        return page < total_pages ? page + 1 : undefined;
      },
      enabled: false,
      retry: false,
    }
  );

  const {
    data: { data: featuredMovies } = {},
    isLoading: isLoadingFeaturedMovies,
  } = useQuery("featuredMovies", () =>
    api.getFeaturedMoviesRequest(axiosInstance)
  );

  const handleSearchQueryChange = (value) => {
    return handleChange("searchQuery")(value);
  };

  const handleReachList = () => {
    console.log("End of the list");
    if (debouncedSearchQuery) {
      fetchNextPage();
    }
  };

  const handlers = {
    handleSearchQueryChange,
    handleReachList,
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      getMoviesBySearchQuery({ refetchPage: (page, index) => index === 0 });
    }
  }, [debouncedSearchQuery]);

  const formikValues = { searchQuery: values.searchQuery };

  // Filters duplicated items caused by the third party API (tmdb).
  // Might be refactored in the future.
  const filterDuplicatedItems = useCallback(
    (items) =>
      [...new Set([...items.map((item) => JSON.stringify(item))])].map((item) =>
        JSON.parse(item)
      ),
    []
  );

  const movies = useMemo(
    () =>
      pages?.length &&
      filterDuplicatedItems(pages.map((group) => group.data.list).flat()),
    [pages]
  );

  return {
    handlers,
    formikValues,
    isLoading: isLoading || isLoadingFeaturedMovies,
    movies,
    featuredMovies,
    isFetchingNextPage,
  };
}

export default useSearchLogic;
