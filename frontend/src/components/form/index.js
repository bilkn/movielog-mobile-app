import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { styles } from "./styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Typography } from "..";

const Form = () => {
  return null;
};

const inputFieldVariants = {
  active: "active",
  warn: "warn",
  disabled: "disabled",
  filled: "filled",
};

const getContainerStyleByVariant = (colors) => ({
  active: {
    borderColor: colors.secondary,
  },
  warn: {
    borderColor: colors.ternary,
  },
});

const getLabelStyleByVariant = (colors) => ({
  warn: {
    color: colors.ternary,
  },
});

export const CommonTextInput = (props) => {
  const { colors } = useTheme();
  const {
    style,
    onBlur: blurHandler,
    onFocus: focusHandler,
    inputStyle,
    icon = null,
    label,
    variantProp,
    error,
    touched,
    autoCapitalize = "none",
    ...rest
  } = props;
  const [variant, setVariant] = useState(variantProp || "");
  const { active, filled, disabled, warn } = inputFieldVariants;

  useEffect(() => {
    setVariant(variantProp);
  }, [variantProp]);

  const handleBlur = (e) => {
    blurHandler && blurHandler(e);
    /*  if (!value) return setVariant(""); */
    setVariant(filled);
  };

  const handleFocus = () => {
    focusHandler && focusHandler();
    setVariant(active);
  };
  useEffect(() => {
    if (variantProp) return setVariant(variantProp);
    setVariant("");
  }, [variantProp, active]);

  return (
    <>
      {label && <Form.Label label={label} variant={variant} />}
      <View
        style={{
          ...styles.inputContainer,
          backgroundColor: colors.gray,
          borderColor: colors.grayBorder,
          ...getContainerStyleByVariant(colors)[variant],
          ...style,
        }}
      >
        {icon}
        <TextInput
          {...rest}
          style={{
            ...styles.commonTextInput,
            paddingLeft: 15,
            ...inputStyle,
            color: colors.text,
          }}
          placeholderTextColor={colors.gray4}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize={autoCapitalize}
        />
      </View>
      {error && !!touched && <Form.ErrorMessage message={error} />}
    </>
  );
};

Form.Label = (props) => {
  const { colors } = useTheme();
  const { label, variant, style } = props;

  return (
    <Typography
      style={{
        ...styles.label,
        ...style,
        ...getLabelStyleByVariant(colors)[variant],
      }}
      variant="textSmall"
    >
      {label}
    </Typography>
  );
};

Form.Searchbox = (props) => {
  const { colors } = useTheme();
  const { onCancelPress, value } = props;
  const [isFocused, setIsFocused] = useState(false);

  const toggleIsFocused = () => {
    setIsFocused(!isFocused);
  };

  return (
    <View style={{ position: "relative" }}>
      <CommonTextInput
        placeholder={isFocused ? "" : "Search"}
        onFocus={toggleIsFocused}
        onBlur={toggleIsFocused}
        inputStyle={{ paddingLeft: 45 }}
        icon={
          <View style={styles.iconContainer}>
            <Feather name="search" size={24} color={colors.text} />
          </View>
        }
        {...props}
      />
      {!!value && (
        <Pressable
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 10,
            right: 15,
            zIndex: 1,
            height: 30,
            width: 30,
          }}
          onPress={onCancelPress}
        >
          <MaterialIcons name="cancel" size={24} color={colors.text} />
        </Pressable>
      )}
    </View>
  );
};

Form.ErrorMessage = ({ message }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.errorMessageContainer}>
      <Typography color={colors.ternary}>{message}</Typography>
    </View>
  );
};

export default Form;
