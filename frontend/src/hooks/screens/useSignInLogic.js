import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useUser } from "..";
import axiosAuthInstance from "../../api/axiosAuth";
import { SCREENS } from "../../constants/screens";
import { populateFieldErrors, secureStore } from "../../helpers";
import { signInSchema } from "../../validations/authValidation";

function useSignInLogic({ navigation }) {
  const { setUser } = useUser();

  const signInRequest = (data) => {
    return axiosAuthInstance.post("/signin", data);
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
      email: "enes.konus@hotmail.com",
      password: "123456",
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
          setUser(res.data);
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
