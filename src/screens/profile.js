import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomButton, Form as CustomForm, MainLayout } from "../components";
import { CommonTextInput } from "../components/form";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Profile = () => {
  return (
    <MainLayout>
      <View style={{ alignItems: "center" }}>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <View>
                <CommonTextInput
                  onChangeText={handleChange("username")}
                  value={values.username}
                  label="Username"
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  onChangeText={handleChange("email")}
                  value={values.email}
                  label="Email"
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <CommonTextInput
                  onChangeText={handleChange("password")}
                  value={values.password}
                  label="Password"
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
          )}
        </Formik>
      </View>
    </MainLayout>
  );
};

export default Profile;
