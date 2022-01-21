import { SCREENS } from "../../constants/screens";

const useMovieCardItemLogic = (props) => {
  const { navigation } = props;

  const handleCardPress = () => {
    navigation.navigate(`${SCREENS.MOVIE_DETAIL}`);
  };

  const handlers = {
    handleCardPress,
  };
  return { handlers };
};

export default useMovieCardItemLogic;
