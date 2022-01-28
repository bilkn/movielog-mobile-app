import { axiosAuthInstance } from "../api/axiosAuth";

function useAuthAxios() {
  axiosAuthInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response, request } = error;

      if (error?.code === "ECONNABORTED") {
        // TODO: If timeout show timeout error.
        console.log("TIMEOUT");
      }

      if (response) {
        const { status } = response;

        // TODO: Send refresh token request.
        if (status == "403") console.log("Token is expired");

        // TODO: If timeout show timeout error.
        if (status == "408") console.log("TIMEOUT");
      }

      if (request) {
        console.log("request", request);
      }

      return Promise.reject(error);
    }
  );
  return { axiosAuthInstance };
}

export default useAuthAxios;
