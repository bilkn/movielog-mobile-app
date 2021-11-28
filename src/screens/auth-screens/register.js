import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { CustomButton, Logo, MainLayout, Typography } from "../../components";
import { CommonTextInput } from "../../components/form";
import { useRegisterScreenLogic } from "../../hooks/screens/useRegisterScreenLogic";

const Register = ({ navigation }) => {
  const { colors } = useTheme();
  const { handlers } = useRegisterScreenLogic({ navigation });
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
            username: "",
            password: "",
            password_again: "",
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
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  label="Repeat password"
                  value={values.password_again}
                  onChangeText={handleChange("password_again")}
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

export default Register;
