import { SCREENS } from "../../constants/screens";
import { useMutation } from "react-query";
import { useAxios, useUser } from "..";
import { useFormik } from "formik";
import { signUpSchema } from "../../validations/authValidation";
import { populateFieldErrors } from "../../helpers";

function useSignUpLogic({ navigation }) {
  const { setUser } = useUser();
  const { axiosInstance } = useAxios({ base: "auth" });
  const submitHandler = (values) => {
    signUp(values);
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldError,
    touched,
    setTouched,
  } = useFormik({
    initialValues: {
      email: "afsdsdf@asdf.com",
      password: "123456",
      passwordConfirm: "123456",
    },
    onSubmit: submitHandler,
    validationSchema: signUpSchema,
  });

  const signUpRequest = (data) => {
    return axiosInstance.post("/signup", data);
  };

  const storeTokens = async (tokens) => {
    try {
      await secureStore.save("tokens", tokens);
    } catch (err) {
      console.log(err);
    }
  };

  const { mutate: signUp, isLoading } = useMutation(signUpRequest, {
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
      populateFieldErrors(error, setFieldError);
    },
  });

  const handleSignInPress = () => {
    navigation.navigate(SCREENS.SIGN_IN);
  };

  const handleSignUpPress = () => {
    handleSubmit();
    setTouched({
      email: true,
      password: true,
      passwordConfirm: true,
    });
  };

  const handlers = {
    handleSignInPress,
    handleChange,
    handleBlur,
    handleSignUpPress,
  };

  return { handlers, isLoading, values, errors, touched };
}

export default useSignUpLogic;
