import { useFormik } from "formik";
import { useCallback } from "react";
import { Alert } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios, useSecureStore, useUser } from "..";
import { populateFieldErrors } from "../../helpers";
import { updateProfileSchema } from "../../validations/authValidation";
import api from "../../api";
import { useFocusEffect } from "@react-navigation/native";

function useProfileLogic() {
  const queryClient = useQueryClient();
  const { signOut, setUser } = useUser();
  const { axiosInstance } = useAxios();
  const secureStore = useSecureStore();
  const { axiosInstance: axiosAuthInstance } = useAxios({ base: "auth" });

  const updateProfileRequest = (data) => {
    return axiosAuthInstance.patch("/update-profile", data);
  };

  const updateProfileHandler = (values) => {
    updateProfile(values);
  };

  const { data } = useQuery(
    "userInfo",
    () => api.getUserInfoRequest(axiosInstance, ["email", "password"]),
    {
      onError: (error) => {
        console.log(error);
        // TODO: Add error handling.
      },
      onSettled: () => {
        console.log("settled");
      },
    }
  );
  const { data: userInfo } = data || {};

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateField,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: userInfo?.username || "",
      email: userInfo?.email || "",
      password: "",
    },
    onSubmit: updateProfileHandler,
    validationSchema: updateProfileSchema,
  });

  const deleteUserDataHandler = () => {
    const { password } = values;
    if (!password) return;
    deleteUserData({ password });
  };

  const deleteDataRequest = (data) => {
    return axiosInstance.delete("/user/data", {data});
  };

  const { mutate: updateProfile, isLoading } = useMutation(
    updateProfileRequest,
    {
      onSuccess: async ({ data: { data } }) => {
        const { email, username } = data;
        const { tokens } = data;
        await secureStore.save("tokens", tokens);
        queryClient.setQueryData("userInfo", { data: { email, username } });
        queryClient.setQueryData("user", { data: { username } });
      },
      onError: (error) => {
        console.log(error);
        populateFieldErrors(error, setFieldError);
      },
    }
  );

  const { mutate: deleteUserData, isLoading: isLoadingDataDeletion } =
    useMutation(deleteDataRequest, {
      onSuccess: () => {
        console.log("SUCCESS DELETE");
      },
      onError: (error) => {
        console.log(error);
      },
    });

  useFocusEffect(
    useCallback(() => {
      resetForm();
    }, [userInfo])
  );

  const showDeleteDataAlert = () => {
    Alert.alert(
      "Are you really want to delete your data?",
      "(only your watchlist and watchlog will be removed).",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("canceled"),
        },
        {
          text: "Delete my data",
          style: "destructive",
          onPress: deleteUserDataHandler,
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
    setFieldTouched("password");
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

  return { handlers, values, errors, touched, isLoading, userInfo };
}

export default useProfileLogic;
