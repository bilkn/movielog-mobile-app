import axios from "axios";
import { useMemo } from "react";
import { useSecureStore, useUser } from ".";

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;
const authBaseURL = process.env.REACT_APP_AUTH_BASE_URL;

function useAxios(options) {
  const { base } = options || {};
  const { signOut, setUser } = useUser();
  const secureStore = useSecureStore();

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: base === "auth" ? authBaseURL : apiBaseURL,
        timeout: 10000,
      }),
    [base]
  );

  const refreshTokens = async () => {
    const { refreshToken } = secureStore.getValueFor("tokens");

    if (refreshToken) {
      try {
        const data = await axiosInstance.post("/token", { refreshToken });
        console.log(data);
        await secureStore.save();
        setUser(data);
        return data;
      } catch (err) {
        console.log(err);
      }
      // TODO: Store new tokens into the secureStore and userState.
    }
  };

  const retryRequestByFreshTokens = async (config) => {
    try {
      const { accessToken } = await refreshTokens();
      config.headers.authorization = `Bearer ${accessToken}`;
      axiosInstance.request(config);
    } catch (err) {
      console.log(e);
    }
  };

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response, request } = error;

      if (error?.code === "ECONNABORTED") {
        // TODO: If timeout show timeout error.
        console.log("TIMEOUT");
      }

      // TODO: Handle refresh token if it is expired.

      if (response) {
        const { status } = response;

        // TODO: Send refresh token request.
        if (status == "403") {
          const { config } = error;
          retryRequestByFreshTokens(config);
        }

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

  return { axiosInstance };
}

export default useAxios;
