import { SCREENS } from "../../constants/screens";
import { useMutation } from "react-query";
import { useAuthAxios, useUser } from "..";
import { useFormik } from "formik";
import { signUpSchema } from "../../validations/authValidation";

function useSignUpLogic({ navigation }) {
  const { setUser } = useUser();
  const { axiosAuthInstance } = useAuthAxios();

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
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: submitHandler,
    validationSchema: signUpSchema,
  });

  const signUpRequest = (data) => {
    return axiosAuthInstance.post("/signup", data);
  };

  const { mutate: signUp, isLoading } = useMutation(signUpRequest, {
    onSuccess: (data) => data && setUser(data.data),
    onError: (error) => {
      console.log("error ----", error);
      const { response } = error;
      const { data } = response;
      Object.entries(data).forEach(([key, value]) => {
        if (value) setFieldError(key, value);
      });
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
      confirmPassword: true,
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
