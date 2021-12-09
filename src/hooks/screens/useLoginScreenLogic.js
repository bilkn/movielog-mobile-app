import { SCREENS } from "../../constants/screens";

export function useLoginScreenLogic({ navigation }) {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleSignUpPress = () => {
    navigation.navigate(SCREENS.REGISTER);
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
