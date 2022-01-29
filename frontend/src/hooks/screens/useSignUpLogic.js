import { SCREENS } from "../../constants/screens";
import { useMutation } from "react-query";
import { useUser } from "..";
import { useFormik } from "formik";
import { signUpSchema } from "../../validations/authValidation";
import { populateFieldErrors } from "../../helpers";
import axiosAuthInstance from "../../api/axiosAuth";

function useSignUpLogic({ navigation }) {
  const { setUser } = useUser();

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
      confirmPassword: "123456",
    },
    onSubmit: submitHandler,
    validationSchema: signUpSchema,
  });

  const signUpRequest = (data) => {
    return axiosAuthInstance.post("/signup", data);
  };

  const { mutate: signUp, isLoading } = useMutation(signUpRequest, {
    onSuccess: (data) => {
      data && setUser(data.data);
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
