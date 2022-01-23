import React from "react";
import { Alert } from "react-native";

function useProfileLogic(props) {
  const { values, errors, validateField } = props;

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

  const handlers = {
    handleDeleteData,
    handleDeleteAccount,
  };

  return { handlers };
}

export default useProfileLogic;
