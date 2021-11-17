import React from "react";
import { View, Text } from "react-native";
import { Form as CustomForm, MainLayout } from "../components";
import { CommonTextInput } from "../components/form";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Profile = () => {
  return (
    <MainLayout>
      <View>
        <Formik>
          <View>
            <CustomForm.Label text="Username" />
            <CommonTextInput />
          </View>
        </Formik>
      </View>
    </MainLayout>
  );
};

export default Profile;
