import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useAxios } from "..";
import { populateFieldErrors } from "../../helpers";
import { forgotPasswordSchema } from "../../validations/authValidation";

function useForgotPasswordLogic({ navigation }) {
  const { axiosInstance } = useAxios({ base: "auth" });

  const submitHandler = (values) => {
    sendResetEmail(values);
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
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: submitHandler,
  });

  const forgotPasswordRequest = (data) => {
    return axiosInstance.post("/forgot-password", data);
  };

  const { mutate: sendResetEmail, isLoading } = useMutation(
    forgotPasswordRequest,
    {
      onSuccess: (data) => console.log("SUCCESS", data), // TODO: REDIRECT TO THE RESET PASSWORD SCREEN.
      onError: (error) => {
        console.log("ERROR", error);
        populateFieldErrors(error, setFieldError);
      },
    }
  );

  const handleGoBackPress = () => {
    navigation.goBack();
    console.log(navigation);
  };

  const handlers = {
    handleSubmit,
    handleChange,
    handleBlur,
    handleGoBackPress,
  };
  return { handlers, isLoading, touched, errors, values };
}

export default useForgotPasswordLogic;
