import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";

const Form = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

const CommonTextInput = (props) => {
  const { colors } = useTheme();
  const { style, icon = null } = props;
  return (
    <View
      style={{
        ...styles.inputContainer,
        backgroundColor: colors.gray,
        borderColor: colors.grayBorder,
        marginTop: 20,
      }}
    >
      {icon}
      <TextInput
        {...props}
        style={{
          ...styles.commonTextInput,
          ...style,
          color: colors.text,
        }}
        placeholderTextColor={colors.gray4}
      />
    </View>
  );
};

Form.Searchbox = (props) => {
  const [value, setValue] = useState("");
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleTextChange = (value) => setValue(value);
  const toggleIsFocused = () => {
    setIsFocused(!isFocused);
  };

  return (
    <CommonTextInput
      onChangeText={handleTextChange}
      value={value}
      placeholder={isFocused ? "" : "Search"}
      onFocus={toggleIsFocused}
      onBlur={toggleIsFocused}
      style={{ paddingLeft: 45 }}
      icon={
        <View style={styles.iconContainer}>
          <Feather name="search" size={24} color={colors.text} />
        </View>
      }
      {...props}
    />
  );
};
export default Form;
