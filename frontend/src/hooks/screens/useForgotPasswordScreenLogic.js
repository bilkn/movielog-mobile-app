export function useForgotPasswordScreenLogic({ navigation }) {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleGoBackPress = () => {
    navigation.goBack();
    console.log(navigation);
  };

  const handlers = { handleSubmit, handleGoBackPress };
  return { handlers };
}
