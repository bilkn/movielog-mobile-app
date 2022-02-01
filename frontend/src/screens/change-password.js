import { View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { CustomButton, MainLayout } from "../components";
import { Formik } from "formik";
import { CommonTextInput } from "../components/form";
import { useChangePasswordLogic } from "../hooks/";

const ChangePassword = () => {
  const { handlers, values, errors, touched, isLoading } =
    useChangePasswordLogic();
  const { handleSubmit, handleChange, handleBlur } = handlers;
  const { colors } = useTheme();

  return (
    <MainLayout
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Formik>
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <View>
              <CommonTextInput
                label="Current Password"
                value={values.password}
                onChangeText={handleChange("password")}
                error={errors.password}
                touched={touched.password}
                onBlur={handleBlur('password')}
                secureTextEntry
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <CommonTextInput
                label="New Password"
                value={values.newPassword}
                onChangeText={handleChange("newPassword")}
                error={errors.newPassword}
                touched={touched.newPassword}
                onBlur={handleBlur('newPassword')}
                secureTextEntry
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <CommonTextInput
                label="Confirm New Password"
                value={values.newPasswordConfirm}
                onChangeText={handleChange("newPasswordConfirm")}
                error={errors.newPasswordConfirm}
                touched={touched.newPasswordConfirm}
                onBlur={handleBlur('newPasswordConfirm')}
                secureTextEntry
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
            </View>
          </View>
        </Formik>
      </View>
    </MainLayout>
  );
};

export default ChangePassword;
