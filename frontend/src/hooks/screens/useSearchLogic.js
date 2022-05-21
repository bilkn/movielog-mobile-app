import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useAxios } from "..";
import { useDebounce } from "use-debounce";
import api from "../../api";
import { useRoute } from "@react-navigation/native";

function useSearchLogic() {
  const { axiosInstance } = useAxios();
  const { params } = useRoute();
  const { genre = "", searchQuery: searchQueryParam } = params || {};


  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: {
      searchQuery: searchQueryParam || "",
    },
    enableReinitialize: true,
  });
  const [debouncedSearchQuery] = useDebounce(values.searchQuery, 1000);

  const resetSearchQuery = () => {
    setFieldValue("searchQuery", "");
  };

  const getMoviesBySearchQueryRequest = (query) => {
    const { queryKey, pageParam = 1 } = query;
    const [_, { searchQuery }] = queryKey;
    return axiosInstance.get(
      `/search/?q=${searchQuery}&page=${pageParam}&genre=${genre}`
    );
  };

  const {
    data: { pages } = {},
    isLoading,
    refetch: getMoviesBySearchQuery,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["searchMovieList", { searchQuery: debouncedSearchQuery }],
    getMoviesBySearchQueryRequest,
    {
      getNextPageParam: (lastPage) => {
        const { total_pages = 1, page } = lastPage?.data || {};
        return page < total_pages ? page + 1 : undefined;
      },
      enabled: !!debouncedSearchQuery,
      onSettled: () => {
        console.log("SETTLED");
      },
    }
  );

  const {
    data: { data: featuredMovies } = {},
    isLoading: isLoadingFeaturedMovies,
  } = useQuery("featuredMovieList", () =>
    api.getFeaturedMoviesRequest(axiosInstance)
  );

  const handleSearchQueryChange = (value) => {
    return handleChange("searchQuery")(value);
  };

  const handleReachList = () => {
    if (debouncedSearchQuery) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (debouncedSearchQuery || genre) {
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

  const searchedMovies = useMemo(() => {
    return (
      pages?.length &&
      filterDuplicatedItems(pages.map((group) => group.data.items).flat())
    );
  }, [pages]);

  const handlers = {
    handleSearchQueryChange,
    handleReachList,
    resetSearchQuery,
  };

  return {
    handlers,
    formikValues,
    isLoading: isLoading || isLoadingFeaturedMovies,
    searchedMovies,
    featuredMovies,
    isFetchingNextPage,
    debouncedSearchQuery,
    genre,
  };
}

export default useSearchLogic;
