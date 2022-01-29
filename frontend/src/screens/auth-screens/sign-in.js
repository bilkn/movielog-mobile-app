import { useTheme } from "@react-navigation/native";
import { Formik, useFormik } from "formik";
import React from "react";
import { View } from "react-native";
import { CustomButton, Logo, MainLayout, Typography } from "../../components";
import { CommonTextInput } from "../../components/form";
import { useSignInLogic } from "../../hooks";

const SignUp = ({ navigation }) => {
  const { colors } = useTheme();
  const { handlers, isLoading, values, errors, touched } = useSignInLogic({
    navigation,
  });

  const {
    handleSignUpPress,
    handleForgotPasswordPress,
    handleSubmit,
    handleChange,
    handleBlur
  } = handlers;

  return (
    <MainLayout
      style={{
        flex: 1,
        justifyContent: "space-between",
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
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                error={errors.password}
                touched={touched.password}
                onBlur={handleBlur("password")}
              />
            </View>
            <View>
              <CustomButton
                onPress={handleSubmit}
                variant="primary"
                style={{ marginTop: 30 }}
                loading={isLoading}
              >
                Sign In
              </CustomButton>
              <CustomButton onPress={handleForgotPasswordPress} variant="text">
                Forgot your password?
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
          New to Movielog?
        </Typography>
        <CustomButton
          onPress={handleSignUpPress}
          variant="text"
          style={{ minWidth: 0 }}
        >
          Sign up now
        </CustomButton>
      </View>
    </MainLayout>
  );
};

export default SignUp;
