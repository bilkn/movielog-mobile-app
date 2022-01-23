import { SCREENS } from "../../constants/screens";
import { useMutation } from "react-query";
import { axiosAuthInstance } from "../../api/axiosAuth";
import { useUser } from "..";

function useSignUpLogic({ navigation }) {
  const { setUser } = useUser();
  const signUpRequest = (data) => {
    return axiosAuthInstance.post("/signup", data);
  };

  const { mutate: signUp, isLoading } = useMutation(signUpRequest, {
    onError: () => console.log("there is an error!"),
    onSuccess: ({ data }) => setUser(data),
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

  return { handlers, isLoading };
}

export default useSignUpLogic;
