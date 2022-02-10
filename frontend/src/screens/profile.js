import React from "react";
import { View } from "react-native";
import { CustomButton, MainLayout } from "../components";
import { CommonTextInput } from "../components/form";
import { Formik, useFormik } from "formik";
import FullWidthButton from "../components/button/full-width-button";
import { ScrollView } from "react-native-gesture-handler";
import { SCREENS } from "../constants/screens";
import { useProfileLogic } from "../hooks";

const Profile = ({ navigation }) => {
  const { handlers, values, errors, touched, isLoading, userInfo } =
    useProfileLogic();

  const {
    handleDeleteAccount,
    handleDeleteData,
    handleSignOut,
    handleChange,
    handleBlur,
    handleSubmit,
  } = handlers;
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainLayout>
        <View style={{ alignItems: "center" }}>
          <Formik>
            <>
              <View>
                <CommonTextInput
                  onChangeText={handleChange("username")}
                  value={values.username || userInfo?.username}
                  label="Username"
                  error={errors.username}
                  touched={touched.username}
                  onBlur={handleBlur("username")}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  onChangeText={handleChange("email")}
                  value={values.email || userInfo?.email}
                  label="Email"
                  error={errors.email}
                  touched={touched.email}
                  onBlur={handleBlur("email")}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  onChangeText={handleChange("password")}
                  value={values.password}
                  label="Password"
                  error={errors.password}
                  touched={touched.password}
                  onBlur={handleBlur("password")}
                />
              </View>
              <CustomButton
                style={{ marginTop: 25 }}
                variant="secondary"
                onPress={handleSubmit}
                loading={isLoading}
              >
                Save changes
              </CustomButton>
            </>
          </Formik>
        </View>
      </MainLayout>
      <View style={{ marginTop: 30, width: "100%" }}>
        <FullWidthButton
          onPress={() => navigation.navigate(SCREENS.CHANGE_PASSWORD)}
        >
          Change my password
        </FullWidthButton>
        <FullWidthButton variant="important" onPress={handleDeleteData}>
          Delete my data
        </FullWidthButton>
        <FullWidthButton variant="important" onPress={handleDeleteAccount}>
          Delete my account
        </FullWidthButton>
        <FullWidthButton
          onPress={handleSignOut}
          style={{ borderBottomWidth: 0 }}
        >
          Sign out
        </FullWidthButton>
      </View>
    </ScrollView>
  );
};

export default Profile;
