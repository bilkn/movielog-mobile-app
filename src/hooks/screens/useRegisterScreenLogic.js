import { SCREENS } from "../../constants/screens";

export function useRegisterScreenLogic({ navigation }) {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleSignInPress = () => {
    navigation.navigate(SCREENS.LOGIN);
    console.log(navigation);
  };

  const handlers = { handleSubmit, handleSignInPress };
  return { handlers };
}
