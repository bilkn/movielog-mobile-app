import axios from "axios";

const baseURL = process.env.REACT_APP_AUTH_BASE_URL;
let headers = {};

/* if (localStorage.accessToken) {
  headers.Authorization = `Bearer ${localStorage.accessToken}`;
} */

const axiosAuthInstance = axios.create({
  baseURL,
  timeout: 10000,
});

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
    console.log("reject it");
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
