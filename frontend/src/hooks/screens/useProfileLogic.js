import { useFormik } from "formik";
import { Alert } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useUser } from "..";
import axiosAuthInstance from "../../api/axiosAuth";
import { populateFieldErrors } from "../../helpers";
import { updateProfileSchema } from "../../validations/authValidation";

function useProfileLogic() {
  const { signOut } = useUser();
  const updateProfileRequest = (data) => {
    return axiosAuthInstance.patch("/update-profile", data);
  };

  /*   const getUserInfoRequest = (data) => {
    return axiosAuthInstance;
  }; */

  const updateProfileHandler = (values) => {
    updateProfile(values);
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    validateField,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: { username: "", email: "", password: "" },
    onSubmit: updateProfileHandler,
    validationSchema: updateProfileSchema,
  });

  const { mutate: updateProfile, isLoading } = useMutation(
    updateProfileRequest,
    {
      onSuccess: (res) => {
        if (res?.data) {
          const { accessToken, refreshToken } = res.data;
          if (accessToken && refreshToken) {
            setUser(res.data);
            storeTokens(res.data);
          }
        }
      },
      onError: (error) => {
        console.log(error);
        populateFieldErrors(error, setFieldError);
      },
    }
  );

  const showDeleteDataAlert = () => {
    Alert.alert(
      "Are you really want to delete your data?",
      "(only your watched list and watch list will be removed).",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("canceled"),
        },
        {
          text: "Delete my data",
          style: "destructive",
          onPress: () => console.log("deleted"),
        },
      ]
    );
  };

  const showDeleteAccountAlert = () => {
    Alert.alert(
      "Are you really want to delete your account?",
      "You can recover your account in 30 days.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("canceled"),
        },
        {
          text: "Delete my account",
          style: "destructive",
          onPress: () => console.log("deleted"),
        },
      ]
    );
  };

  const validatePassword = () => {
    validateField("password");
    return values.password;
  };

  const handleDeleteData = () => {
    if (!validatePassword()) return;
    showDeleteDataAlert();
  };

  const handleDeleteAccount = () => {
    if (!validatePassword()) return;
    showDeleteAccountAlert();
  };

  const handleSignOut = () => {
    signOut();
  };

  const handlers = {
    handleDeleteData,
    handleDeleteAccount,
    handleSignOut,
    handleChange,
    handleSubmit,
    handleBlur,
  };

  return { handlers, values, errors, touched, isLoading };
}

export default useProfileLogic;
