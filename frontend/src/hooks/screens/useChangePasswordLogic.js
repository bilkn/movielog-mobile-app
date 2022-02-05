import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useAxios } from "..";
import { populateFieldErrors } from "../../helpers";
import { changePasswordSchema } from "../../validations/authValidation";

function useChangePasswordLogic() {
  const { axiosInstance } = useAxios({ base: "auth" });

  const changePasswordRequest = (data) => {
    return axiosInstance.patch("/change-password", data);
  };

  const submitHandler = (values) => {
    changePassword(values);
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
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: submitHandler,
  });

  const { mutate: changePassword, isLoading } = useMutation(
    changePasswordRequest,
    {
      // TODO: Show success notification.
      onSuccess: (data) => console.log(data.data.message),
      onError: (error) => {
        console.log(error);
        populateFieldErrors(error, setFieldError);
      },
    }
  );

  const handlers = { handleSubmit, handleChange, handleBlur };
  return { handlers, values, errors, touched, isLoading };
}

export default useChangePasswordLogic;
