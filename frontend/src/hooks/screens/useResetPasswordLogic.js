import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import axiosAuthInstance from "../../api/axiosAuth";
import { SCREENS } from "../../constants/screens";
import { populateFieldErrors } from "../../helpers";
import { resetPasswordSchema } from "../../validations/authValidation";

function useResetPasswordLogic() {
  const navigate = useNavigation();

  const resetPasswordRequest = (data) => {
    return axiosAuthInstance.patch("/reset", data);
  };

  const submitHandler = (values) => {
    resetPassword(values);
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
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: submitHandler,
  });

  const { mutate: resetPassword, isLoading } = useMutation(
    resetPasswordRequest,
    {
      // TODO: Redirect to the Sign In screen on success.
      onSuccess: (data) => null,
      onError: (error) => {
        console.log(error);
        populateFieldErrors(error, setFieldError);
      },
    }
  );

  const handleBackToSignInPress = () => navigate(SCREENS.SIGN_IN);

  const handlers = {
    handleSubmit,
    handleChange,
    handleBlur,
  };
  return {
    handlers,
    isLoading,
    values,
    errors,
    touched,
    handleBackToSignInPress,
  };
}

export default useResetPasswordLogic;
