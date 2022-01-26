import React from "react";
import { axiosAuthInstance } from "../api/axiosAuth";

function useAuthAxios() {
  axiosAuthInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const { status } = error?.response;

      if (!status) return Promise.reject(error);

      if (status === "403") console.log("Token is expired."); // TODO: Send refresh token request.
      if (error) return Promise.reject(error);
    }
  );
  return { axiosAuthInstance };
}

export default useAuthAxios;
