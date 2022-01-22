import React from "react";

function useChangePasswordLogic() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const handlers = { handleSubmit };
  return { handlers };
}

export default useChangePasswordLogic;
