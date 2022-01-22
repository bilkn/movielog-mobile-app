import { useSignUpLogic } from "..";
import { SCREENS } from "../../constants/screens";

function useSignInLogic({ navigation }) {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleSignUpPress = () => {
    navigation.navigate(SCREENS.SIGN_UP);
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate(SCREENS.FORGOT_PASSWORD);
  };

  const handlers = {
    handleSubmit,
    handleSignUpPress,
    handleForgotPasswordPress,
  };
  return { handlers };
}

export default useSignInLogic;
