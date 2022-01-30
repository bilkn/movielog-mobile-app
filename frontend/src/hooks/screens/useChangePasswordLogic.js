import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useUser } from "..";
import axiosAuthInstance from "../../api/axiosAuth";
import { populateFieldErrors } from "../../helpers";
import { changePasswordSchema } from "../../validations/authValidation";

function useChangePasswordLogic() {
  const { user } = useUser();

  // TODO: Handle access token expiration.

  const changePasswordRequest = (data) => {
    console.log(user.accessToken)
    return axiosAuthInstance.patch("/change-password", data, {
      headers: {
        // BACKLOG: If access token is expired, user.accessToken won't be refreshed. 
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
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
