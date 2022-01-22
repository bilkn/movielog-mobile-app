import { useTheme } from "@react-navigation/native";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { View } from "react-native";
import {
  CustomButton,
  Form,
  Logo,
  MainLayout,
  Typography,
} from "../../components";
import { CommonTextInput } from "../../components/form";
import { useSignUpLogic } from "../../hooks";
import { signUpSchema } from "../../validations/authValidation";

const SignUp = ({ navigation }) => {
  const { colors } = useTheme();
  const { handlers } = useSignUpLogic({ navigation });
  const { handleSubmit, handleSignInPress } = handlers;

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
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={signUpSchema}
        >
          {({ values, errors, handleChange, handleSubmit }) => {
            console.log(errors);
            return (
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
                <View style={{ marginTop: 15 }}>
                  <CommonTextInput
                    label="Confirm password"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    error={errors.confirmPassword}
                  />
                </View>
                <View>
                  <CustomButton
                    onPress={handleSubmit}
                    variant="primary"
                    style={{ marginTop: 30 }}
                  >
                    Sign Up
                  </CustomButton>
                </View>
              </View>
            );
          }}
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
    </MainLayout>
  );
};

export default SignUp;
