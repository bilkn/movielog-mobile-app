import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useUser } from "..";
import axiosAuthInstance from "../../api/axiosAuth";
import { SCREENS } from "../../constants/screens";
import { populateFieldErrors } from "../../helpers";
import { signInSchema } from "../../validations/authValidation";

function useSignInLogic({ navigation }) {
  const { setUser } = useUser();

  const signInRequest = (data) => {
    return axiosAuthInstance.post("/signin", data);
  };

  const submitHandler = (values) => {
    console.log(values);
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

  const { mutate: signIn, isLoading } = useMutation(signInRequest, {
    onSuccess: (data) => data && setUser(data.data),
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
    handleBlur
  };
  return { handlers, isLoading, values, errors, touched };
}

export default useSignInLogic;
