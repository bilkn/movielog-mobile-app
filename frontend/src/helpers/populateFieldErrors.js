function populateFieldErrors(error, setFieldError) {
  const { response } = error || {};
  if (!response?.data) return;

  const { data } = response;
  Object.entries(data).forEach(([key, value]) => {
    if (value) setFieldError(key, value);
  });
}

export default populateFieldErrors;
