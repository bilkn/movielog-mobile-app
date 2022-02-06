import { SCREENS } from "../../constants/screens";

const useMovieCardItemLogic = (props) => {
  const { navigation } = props;

  const handleCardPress = (movieID) => {
    navigation.navigate(SCREENS.MOVIE_DETAIL, { movieID });
  };

  const handlers = {
    handleCardPress,
  };
  return { handlers };
};

export default useMovieCardItemLogic;
