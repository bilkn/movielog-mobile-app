import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";

function useMoviesByGenreLogic() {
  const navigation = useNavigation();
  const { params } = useRoute();

  useEffect(() => {
    navigation.setOptions({ title: params.genre });
  }, []);
  return { params, navigation };
}

export default useMoviesByGenreLogic;
