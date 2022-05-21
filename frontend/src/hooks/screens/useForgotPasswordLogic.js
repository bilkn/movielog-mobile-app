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
    console.log({data})
    return axiosInstance.post("/forgot-password", data);
  };

  const { mutate: sendResetEmail, isLoading } = useMutation(
    forgotPasswordRequest,
    {
      onError: (error) => {
        console.log("ERROR", error);
        populateFieldErrors(error, setFieldError);
      },
    }
  );

  const handleGoBackPress = () => {
    navigation.goBack();
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
