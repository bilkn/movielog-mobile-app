import { useState } from "react";
import { useQuery } from "react-query";
import { useAxios } from "..";
import api from "../../api";

const initialListValues = {
  watchList: true,
  watchedList: false,
};

function useListLogic() {
  const [listTab, setListTab] = useState(initialListValues);
  const { axiosInstance } = useAxios();

  const {
    data: { data: { watchList } = {} } = {},
    isLoading: watchListIsLoading,
  } = useQuery("watchList", () => api.getMovieList(axiosInstance, "watchList"));

  const {
    data: { data: { watchedList } = {} } = {},
    isLoading: watchedListIsLoading,
  } = useQuery("watchedList", () =>
    api.getMovieList(axiosInstance, "watchedList")
  );

  const handleTabChange = (tab) => {
    setListTab({ watchList: false, watchedList: false, [tab]: true });
  };

  const handleReachList = () => {
    console.log("Handle reach list.");
  };

  const handlers = {
    handleTabChange,
    handleReachList
  };

  return {
    listTab,
    handlers,
    watchList,
    watchedList,
    isLoading: watchListIsLoading || watchedListIsLoading,
  };
}

export default useListLogic;
