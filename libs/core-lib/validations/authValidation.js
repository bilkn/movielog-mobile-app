const yup = require("yup");

const sharedPasswordValidaton = yup
  .string()
  .required("Password field must not be empty!")
  .min(6, "Password must be at least 6 character.");

const sharedEmailValidation = yup
  .string()
  .required("Email field must not be empty!")
  .email("Please provide valid email.");

const sharedConfirmPasswordValidation = (ref) =>
  yup
    .string()
    .oneOf([yup.ref(ref), null], "Passwords don't match!")
    .required("Confirm password field must not be empty!");

const signUpSchema = yup.object({
  email: sharedEmailValidation,
  password: sharedPasswordValidaton,
  passwordConfirm: sharedConfirmPasswordValidation("password"),
});

const signInSchema = yup.object({
  email: sharedEmailValidation,
  password: yup.string().required("Password field must not be empty!"),
});

const resetPasswordSchema = yup.object({
  newPassword: sharedPasswordValidaton,
  newPasswordConfirm: sharedConfirmPasswordValidation("newPassword"),
});

const deleteAccountSchema = yup.object({
  password: sharedPasswordValidaton,
  refreshToken: yup
    .string()
    .required("Refresh token is not provided, please provide refresh token!"),
});

const deleteUserDataSchema = yup.object({
  password: sharedPasswordValidaton,
});

const changePasswordSchema = yup.object({
  password: sharedPasswordValidaton,
  newPassword: sharedPasswordValidaton,
  newPasswordConfirm: sharedConfirmPasswordValidation("newPassword"),
});

const updateProfileSchema = yup.object({
  password: sharedPasswordValidaton,
  username: yup
    .string()
    .matches(
      /[a-zA-Z0-9_]/,
      "A username can only contain alphanumeric characters (letters A-Z, numbers 0-9) with the exception of underscores."
    ),
  email: sharedEmailValidation,
});

const forgotPasswordSchema = yup.object({
  email: sharedEmailValidation,
});

module.exports = {
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
  deleteAccountSchema,
  deleteUserDataSchema,
  changePasswordSchema,
  updateProfileSchema,
  forgotPasswordSchema,
};
