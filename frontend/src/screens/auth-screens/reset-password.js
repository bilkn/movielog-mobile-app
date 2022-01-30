import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { CustomButton, Logo, MainLayout, Typography } from "../../components";
import { CommonTextInput } from "../../components/form";
import { useResetPasswordLogic } from "../../hooks";

function ResetPassword() {
  const { handlers, values, errors, touched, isLoading } =
    useResetPasswordLogic();
  const { handleBlur, handleChange, handleSubmit, handleBackToSignInPress } =
    handlers;

  return (
    <MainLayout
      style={{
        flex: 1,
      }}
    >
      <View style={{ marginTop: 50 }}>
        <Logo large />
      </View>
      <View style={{ alignItems: "center", marginTop: 106 }}>
        <Formik>
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <View>
              <CommonTextInput
                label="New Password"
                secureTextEntry
                value={values.newPassword}
                onChangeText={handleChange("newPassword")}
                error={errors.newPassword}
                touched={touched.newPassword}
                onBlur={handleBlur("newPassword")}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <CommonTextInput
                label="Confirm New Password"
                secureTextEntry
                value={values.newPasswordConfirm}
                onChangeText={handleChange("newPasswordConfirm")}
                error={errors.newPasswordConfirm}
                touched={touched.newPasswordConfirm}
                onBlur={handleBlur("newPasswordConfirm")}
              />
            </View>
            <View>
              <CustomButton
                onPress={handleSubmit}
                variant="primary"
                style={{ marginTop: 30 }}
                loading={isLoading}
              >
                Change Password
              </CustomButton>
              <CustomButton onPress={handleBackToSignInPress} variant="text">
                Back To Sign In
              </CustomButton>
            </View>
          </View>
        </Formik>
      </View>
    </MainLayout>
  );
}

export default ResetPassword;
