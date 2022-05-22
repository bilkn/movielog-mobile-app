import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "use-debounce/lib";
import { useAxios } from "..";
import api from "../../api";
import { SCREENS } from "../../constants/screens";

function useHomeLogic() {
  const { axiosInstance } = useAxios();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1500);

  const { data: { data: featuredMovies = [] } = {}, isLoading } = useQuery(
    "featuredMovies",
    () => api.getFeaturedMoviesRequest(axiosInstance)
  );

  const { data: { data: { username } = {} } = {} } = useQuery("user", () =>
    api.getUserInfoRequest(axiosInstance)
  );

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const resetSearchQuery = () => {
    console.log("click");
    setSearchQuery("");
  };

  const handlers = {
    handleSearchQueryChange,
    resetSearchQuery,
  };

  useEffect(() => {
    if (searchQuery && debouncedSearchQuery) {
      navigation.navigate(SCREENS.SEARCH, {
        screen: SCREENS.SEARCH,
        params: { searchQuery },
      });
      resetSearchQuery();
    }
  }, [debouncedSearchQuery, searchQuery]);

  return { featuredMovies, isLoading, username, searchQuery, handlers };
}

export default useHomeLogic;
