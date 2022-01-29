import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { CustomButton, Logo, MainLayout } from "../../components";
import { CommonTextInput } from "../../components/form";
import { useForgotPasswordLogic } from "../../hooks/";

const ForgotPassword = ({ navigation }) => {
  const { handlers, values, errors, touched,isLoading } = useForgotPasswordLogic({
    navigation,
  });
  const { handleSubmit, handleChange, handleBlur, handleGoBackPress } =
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
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                error={errors.email}
                onBlur={handleBlur("email")}
                touched={touched.email}
              />
            </View>
            <View>
              <CustomButton
                onPress={handleSubmit}
                variant="primary"
                style={{ marginTop: 30 }}
                loading={isLoading}
              >
                Reset Password
              </CustomButton>
              <CustomButton onPress={handleGoBackPress} variant="text">
                Go back
              </CustomButton>
            </View>
          </View>
        </Formik>
      </View>
    </MainLayout>
  );
};

export default ForgotPassword;
