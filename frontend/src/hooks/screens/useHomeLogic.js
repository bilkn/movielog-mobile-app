import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { useAxios } from "..";
import api from "../../api";
import { SCREENS } from "../../constants/screens";

function useHomeLogic() {
  const { axiosInstance } = useAxios();
  const navigation = useNavigation();

  const { data: { data: featuredMovies } = {}, isLoading } = useQuery(
    "featuredMovies",
    () => api.getFeaturedMoviesRequest(axiosInstance)
  );

  const { data: { data: { username } = {} } = {} } = useQuery("user", () =>
    api.getUserInfoRequest(axiosInstance)
  );

  /*   const handleSearchQueryChange = (value, handleChange) => {
    console.log(value);

    if (value) {
      navigation.navigate(SCREENS.SEARCH, {
        searchQuery: value,
      });
    }

    return handleChange("searchQuery")(value);
  };

  const handlers = {
    handleSearchQueryChange,
  };
 */
  return { featuredMovies, isLoading, username };
}

export default useHomeLogic;
