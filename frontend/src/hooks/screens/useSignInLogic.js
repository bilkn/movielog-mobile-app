import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useUser } from "..";
import { axiosAuthInstance } from "../../api/axiosAuth";
import { SCREENS } from "../../constants/screens";
import { signInSchema, signUpSchema } from "../../validations/authValidation";

function useSignInLogic({ navigation }) {
  const { setUser } = useUser();

  const signInRequest = (data) => {
    return axiosAuthInstance.post("/signin", data);
  };

  const submitHandler = (values) => {
    console.log(values);
    signIn(values);
  };

  const { values, errors, handleChange, handleSubmit, setFieldError } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInSchema,
      onSubmit: submitHandler,
    });

  const { mutate: signIn, isLoading } = useMutation(signInRequest, {
    onError: (error) => {
      const { response } = error;

      if (response?.data) {
        setFieldError("email", response.data.message);
      }
    },
    onSuccess: ({ data }) => setUser(data),
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
  };
  return { handlers, isLoading, values, errors };
}

export default useSignInLogic;
