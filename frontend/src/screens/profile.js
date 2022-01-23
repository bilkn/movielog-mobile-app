import React from "react";
import { View } from "react-native";
import { CustomButton, MainLayout } from "../components";
import { CommonTextInput } from "../components/form";
import { Formik, useFormik } from "formik";
import FullWidthButton from "../components/button/full-width-button";
import { ScrollView } from "react-native-gesture-handler";
import { SCREENS } from "../constants/screens";
import { updateProfileSchema } from "../validations/authValidation";
import { useProfileLogic } from "../hooks";

const Profile = ({ navigation }) => {
  const { handleChange, handleSubmit, validateField, values, errors } =
    useFormik({
      initialValues: { username: "", email: "", password: "" },
      onSubmit: (values) => console.log(values),
      validationSchema: updateProfileSchema,
    });
  const { handlers } = useProfileLogic({ values, errors, validateField });
  const { handleDeleteAccount, handleDeleteData } = handlers;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainLayout>
        <View style={{ alignItems: "center" }}>
          <Formik>
            <>
              <View>
                <CommonTextInput
                  onChangeText={handleChange("username")}
                  value={values.username}
                  label="Username"
                  error={errors.username}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  onChangeText={handleChange("email")}
                  value={values.email}
                  label="Email"
                  error={errors.email}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  onChangeText={handleChange("password")}
                  value={values.password}
                  label="Password"
                  error={errors.password}
                />
              </View>
              <CustomButton
                style={{ marginTop: 25 }}
                variant="secondary"
                onPress={handleSubmit}
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
        <FullWidthButton style={{ borderBottomWidth: 0 }}>
          Logout
        </FullWidthButton>
      </View>
    </ScrollView>
  );
};

export default Profile;
