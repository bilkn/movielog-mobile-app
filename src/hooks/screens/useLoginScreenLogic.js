import { SCREENS } from "../../constants/screens";

export function useLoginScreenLogic({ navigation }) {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleSignUpPress = () => {
    navigation.navigate(SCREENS.REGISTER);
    console.log(navigation);
  };

  const handlers = { handleSubmit, handleSignUpPress };
  return { handlers };
}
