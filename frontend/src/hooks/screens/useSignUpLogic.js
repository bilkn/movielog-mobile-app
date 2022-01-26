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

  const { values, errors, handleChange, handleSubmit, setFieldError } =
    useFormik({
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

  const {
    mutate: signUp,
    isLoading,
    data,
  } = useMutation(signUpRequest, {
    onSuccess: ({ data }) => setUser(data),
    onError: ({ response }) => {
      const { data } = response;
      Object.entries(data).forEach(([key, value]) => {
        if (value) setFieldError(key, value);
      });
    },
  });

  const handleSignInPress = () => {
    navigation.navigate(SCREENS.SIGN_IN);
  };

  const handlers = {
    handleSignInPress,
    handleChange,
    handleSubmit,
  };

  return { handlers, isLoading, values, errors };
}

export default useSignUpLogic;
