import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useAxios, useSecureStore, useUser } from "..";
import { SCREENS } from "../../constants/screens";
import { populateFieldErrors } from "../../helpers";
import { signInSchema } from "../../validations/authValidation";

function useSignInLogic({ navigation }) {
  const secureStore = useSecureStore();
  const { axiosInstance } = useAxios({ base: "auth" });
  const { setUser } = useUser();

  const signInRequest = (data) => {
    return axiosInstance.post("/signin", data);
  };

  const submitHandler = (values) => {
    signIn(values);
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldError,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: submitHandler,
  });

  const storeTokens = async (tokens) => {
    try {
      await secureStore.save("tokens", tokens);
    } catch (err) {
      console.log(err);
    }
  };

  const { mutate: signIn, isLoading } = useMutation(signInRequest, {
    onSuccess: (res) => {
      if (res?.data) {
        const { accessToken, refreshToken } = res.data;
        if (accessToken && refreshToken) {
          setUser((prev) => ({ ...prev, tokens: res.data }));
          storeTokens(res.data);
        }
      }
    },
    onError: (error) => {
      console.log(error);
      populateFieldErrors(error, setFieldError);
    },
  });

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
    handleChange,
    handleBlur,
  };
  return { handlers, isLoading, values, errors, touched };
}

export default useSignInLogic;
