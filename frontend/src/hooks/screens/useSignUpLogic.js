import { SCREENS } from "../../constants/screens";

function useSignUpLogic({ navigation }) {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleSignInPress = () => {
    navigation.navigate(SCREENS.SIGN_IN);
    console.log(navigation);
  };

  const handlers = { handleSubmit, handleSignInPress };

  return { handlers };
}

export default useSignUpLogic;
