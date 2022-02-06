import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useAxios } from "..";
import { useDebounce } from "use-debounce";

function useSearchLogic() {
  const { axiosInstance } = useAxios();
  const { values, handleChange } = useFormik({
    initialValues: {
      searchQuery: "",
    },
  });

  const [debouncedSearchQuery] = useDebounce(values.searchQuery, 1000);

  const getMoviesBySearchQueryRequest = (query) => {
    const { queryKey } = query;
    const [_, { searchQuery }] = queryKey;
    const page = 1;
    return axiosInstance.get(`/search/?q=${searchQuery}&page=${page}`);
  };

  const {
    data: { data: movies } = {},
    isLoading,
    refetch: getMoviesBySearchQuery,
  } = useQuery(
    ["searchMovieList", { searchQuery: values.searchQuery }],
    getMoviesBySearchQueryRequest,
    {
      enabled: false,
    }
  );

  const handleSearchQueryChange = (value) => {
    return handleChange("searchQuery")(value);
  };

  const handlers = {
    handleSearchQueryChange,
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      getMoviesBySearchQuery();
    }
  }, [debouncedSearchQuery]);

  const formikValues = { searchQuery: values.searchQuery };

  return { handlers, formikValues, movies,isLoading };
}

export default useSearchLogic;
