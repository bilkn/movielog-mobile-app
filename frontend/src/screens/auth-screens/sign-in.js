import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { CustomButton, Logo, MainLayout, Typography } from "../../components";
import { CommonTextInput } from "../../components/form";
import { useSignInLogic } from "../../hooks";
import { signInSchema } from "../../validations/authValidation";

const SignUp = ({ navigation }) => {
  const { colors } = useTheme();
  const { handlers } = useSignInLogic({ navigation });
  const { handleSubmit, handleSignUpPress, handleForgotPasswordPress } =
    handlers;

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
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={signInSchema}
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
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  error={errors.email}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={errors.password}
                />
              </View>
              <View>
                <CustomButton
                  onPress={handleSubmit}
                  variant="primary"
                  style={{ marginTop: 30 }}
                >
                  Sign In
                </CustomButton>
                <CustomButton
                  onPress={handleForgotPasswordPress}
                  variant="text"
                >
                  Forgot your password?
                </CustomButton>
              </View>
            </View>
          )}
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
