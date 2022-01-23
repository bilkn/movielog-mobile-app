import { SCREENS } from "../../constants/screens";
import { useMutation } from "react-query";
import { axiosAuthInstance } from "../../api/axiosAuth";

function useSignUpLogic({ navigation }) {
  const signUpRequest = (data) => {
    return axiosAuthInstance.post("/signup", data);
  };

  const { mutate: signUp } = useMutation(signUpRequest, {
    onError: () => console.log("there is an error!"),
    onSuccess: ({ data }) => console.log("Sign up is successfull!", data.data),
  });

  const handleSubmit = (values) => {
    console.log(values);
    signUp(values);
  };

  const handleSignInPress = () => {
    navigation.navigate(SCREENS.SIGN_IN);
    console.log(navigation);
  };

  const handlers = { handleSubmit, handleSignInPress };

  return { handlers };
}

export default useSignUpLogic;
