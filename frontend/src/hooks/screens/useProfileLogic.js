import { useFormik } from "formik";
import { Alert } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios, useUser } from "..";
import { populateFieldErrors } from "../../helpers";
import { updateProfileSchema } from "../../validations/authValidation";
import api from "../../api";

function useProfileLogic() {
  const queryClient = useQueryClient();
  const { signOut, setUser } = useUser();
  const { axiosInstance } = useAxios();
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
    validateField,
    setFieldError,
    values,
    errors,
    touched,
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

  const { mutate: updateProfile, isLoading } = useMutation(
    updateProfileRequest,
    {
      onSuccess: ({ data: { data } }) => {
        console.log("result data", data);

        queryClient.setQueryData("userInfo", { data });
      },
      onError: (error) => {
        console.log("ERROR!!");
        populateFieldErrors(error, setFieldError);
      },
    }
  );

  console.log({ userInfo });

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

  return { handlers, values, errors, touched, isLoading, userInfo };
}

export default useProfileLogic;
