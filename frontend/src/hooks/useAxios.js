import axios from "axios";
import { useCallback, useMemo } from "react";
import { useSecureStore, useUser } from ".";

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;
const authBaseURL = process.env.REACT_APP_AUTH_BASE_URL;

function useAxios(options) {
  const { base } = options || {};
  const { user, signOut, setUser } = useUser();
  const secureStore = useSecureStore();

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: base === "auth" ? authBaseURL : apiBaseURL,
        timeout: 10000,
      }),
    [base]
  );

  const refreshTokens = useCallback(async () => {
    try {
      const { refreshToken } = await secureStore.getValueFor("tokens");
      if (!refreshToken) return;
      const data = await axiosInstance.post("/token", {
        token: refreshToken,
      });
      await secureStore.save();
      setUser(data);
      return data;
    } catch (err) {}
    // TODO: Store new tokens into the secureStore and userState.
  }, []);

  const retryRequestByFreshTokens = useCallback(async (config) => {
    try {
      const { accessToken } = (await refreshTokens()) || {};
      if (!accessToken) return;

      config.headers.authorization = `Bearer ${accessToken}`;
      return axiosInstance.request(config);
    } catch (err) {
      console.log(e);
    }
  }, []);

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const { response, request } = error;

      if (error?.code === "ECONNABORTED") {
        // TODO: If timeout show timeout error.
        console.log("TIMEOUT");
      }

      // TODO: Handle refresh token if it is expired.

      if (response) {
        const { status } = response;

        // TODO: Send refresh token request.

        if (response?.data.expired) {
          console.log("EXPIRED");
          /*    const { config } = error;
          try {
            const data = config && (await retryRequestByFreshTokens(config));
            if (data?.data) return data.data;
          } catch (err) {
            console.log(err);
          } */
        }

        // TODO: If timeout show timeout error.
        if (status == "408") console.log("TIMEOUT");
      }

      if (request) {
      }
      console.log("reject it");
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.request.use((config) => {
    const { accessToken } = user || {};

    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return { axiosInstance };
}

export default useAxios;