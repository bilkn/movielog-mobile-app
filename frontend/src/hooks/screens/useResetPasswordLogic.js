import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useAxios } from "..";
import { SCREENS } from "../../constants/screens";
import { populateFieldErrors } from "../../helpers";
import { resetPasswordSchema } from "../../validations/authValidation";

function useResetPasswordLogic() {
  const { axiosInstance } = useAxios({ base: "auth" });
  const { params } = useRoute();
  const navigation = useNavigation();

  const resetPasswordRequest = (data) => {
    const requestBody = {
      id: params.id,
      ...data,
    };
    return axiosInstance.patch("/reset-password", requestBody);
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
      onSuccess: () => navigation.navigate(SCREENS.SIGN_IN),
      onError: (error) => {
        console.log(error);
        populateFieldErrors(error, setFieldError);
      },
    }
  );

  const handleBackToSignInPress = () => navigation.navigate(SCREENS.SIGN_IN);

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
