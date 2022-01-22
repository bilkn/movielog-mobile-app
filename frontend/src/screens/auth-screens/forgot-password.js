import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { CustomButton, Logo, MainLayout } from "../../components";
import { CommonTextInput } from "../../components/form";
import { useForgotPasswordScreenLogic } from "../../hooks/";

const ForgotPassword = ({ navigation }) => {
  const { colors } = useTheme();
  const { handlers } = useForgotPasswordScreenLogic({ navigation });
  const { handleSubmit, handleGoBackPress } = handlers;

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
        <Formik
          initialValues={{
            email: "",
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
                  label="Email"
                  value={values.username}
                  onChangeText={handleChange("email")}
                />
              </View>
              <View>
                <CustomButton
                  onPress={handleSubmit}
                  variant="primary"
                  style={{ marginTop: 30 }}
                >
                  Reset Password
                </CustomButton>
                <CustomButton onPress={handleGoBackPress} variant="text">
                  Go back
                </CustomButton>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </MainLayout>
  );
};

export default ForgotPassword;
