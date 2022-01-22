import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { CustomButton, MainLayout, Typography } from "../components";
import { Formik } from "formik";
import { CommonTextInput } from "../components/form";
import { useChangePasswordLogic } from "../hooks/";
import { changePasswordSchema } from "../validations/authValidation";

const ChangePassword = () => {
  const { handlers } = useChangePasswordLogic();
  const { handleSubmit } = handlers;
  const { colors } = useTheme();

  return (
    <MainLayout
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            newPasswordConfirm: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={changePasswordSchema}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <View>
                <CommonTextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={errors.password}
                  secureTextEntry={true}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  label="New password"
                  value={values.newPassword}
                  onChangeText={handleChange("newPassword")}
                  error={errors.newPassword}
                  secureTextEntry={true}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  label="Confirm new password"
                  value={values.newPasswordConfirm}
                  onChangeText={handleChange("newPasswordConfirm")}
                  error={errors.newPasswordConfirm}
                  secureTextEntry={true}
                />
              </View>
              <View>
                <CustomButton
                  onPress={handleSubmit}
                  variant="primary"
                  style={{ marginTop: 30 }}
                >
                  Change Password
                </CustomButton>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </MainLayout>
  );
};

export default ChangePassword;
