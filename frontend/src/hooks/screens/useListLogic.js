import { useState } from "react";

const initialListValues = {
  watchList: true,
  watchedList: false,
};

function useListLogic() {
  const [listTab, setListTab] = useState(initialListValues);

  const handleTabChange = (tab) => {
    setListTab({ watchList: false, watchedList: false, [tab]: true });
  };

  const handlers = {
    handleTabChange,
  };

  return {
    listTab,
    handlers,
  };
}

export default useListLogic;
