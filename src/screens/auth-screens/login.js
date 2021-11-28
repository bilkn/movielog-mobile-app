import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { CustomButton, Logo, MainLayout, Typography } from "../../components";
import { CommonTextInput } from "../../components/form";
import { useLoginScreenLogic } from "../../hooks/screens/useLoginScreenLogic";

const Login = ({ navigation }) => {
  const { colors } = useTheme();
  const { handlers } = useLoginScreenLogic({ navigation });
  const { handleSubmit, handleSignUpPress,handleForgotPasswordPress } = handlers;

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
            username: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <View>
                <CommonTextInput
                  label="Username"
                  value={values.username}
                  onChangeText={handleChange("username")}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
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
                <CustomButton onPress={handleForgotPasswordPress} variant="text">
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

export default Login;
