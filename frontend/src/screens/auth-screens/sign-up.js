import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { CustomButton, Logo, MainLayout, Typography } from "../../components";
import { CommonTextInput } from "../../components/form";
import { useSignUpLogic } from "../../hooks";

const SignUp = ({ navigation }) => {
  const { colors } = useTheme();
  const { handlers, isLoading, values, errors, touched } = useSignUpLogic({
    navigation,
  });
  const { handleSignInPress, handleChange, handleBlur, handleSignUpPress } =
    handlers;

  return (
    <MainLayout
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ marginTop: 50 }}>
          <Logo large />
        </View>
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
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  error={errors.email}
                  touched={touched.email}
                  onBlur={handleBlur("email")}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={errors.password}
                  secureTextEntry
                  touched={touched.password}
                  onBlur={handleBlur("password")}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  label="Confirm password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  error={errors.confirmPassword}
                  secureTextEntry
                  touched={touched.confirmPassword}
                  onBlur={handleBlur("confirmPassword")}
                />
              </View>
              <View>
                <CustomButton
                  onPress={handleSignUpPress}
                  variant="primary"
                  style={{ marginTop: 30 }}
                  loading={isLoading}
                >
                  Sign Up
                </CustomButton>
              </View>
            </View>
          </Formik>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            paddingBottom: 30,
          }}
        >
          <Typography variant="textSmall" color={colors.gray3}>
            Already a member?
          </Typography>
          <CustomButton
            onPress={handleSignInPress}
            variant="text"
            style={{ minWidth: 0 }}
          >
            Sign In
          </CustomButton>
        </View>
      </KeyboardAvoidingView>
    </MainLayout>
  );
};

export default SignUp;
