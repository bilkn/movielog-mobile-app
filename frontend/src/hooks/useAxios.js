import axios from "axios";
import { useCallback, useMemo } from "react";
import { useSecureStore, useUser } from ".";
import { toaster } from "../helpers";

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
      const { data } = await axiosInstance.post(
        "/token",
        {
          token: refreshToken,
        },
        { baseURL: authBaseURL }
      );
      if (!data) return;

      await secureStore.save("tokens", data);
      setUser((prev) => ({ ...prev, tokens: data }));
      return data;
    } catch (err) {}
  }, []);

  const retryRequestByFreshTokens = useCallback(async (config) => {
    try {
      const { accessToken } = (await refreshTokens()) || {};
      if (!accessToken) return;

      config.headers.authorization = `Bearer ${accessToken}`;
      return axios.request(config);
    } catch (err) {
      console.log(e);
    }
  }, []);

  const showToastMessage = (success, message) => {};

  // TODO: Add connection interceptor to prevent unnecessary requests.

  useMemo(
    () =>
      axiosInstance.interceptors.response.use(
        (response) => {
          const { message } = response?.data || {};
          if (message !== undefined) {
            console.log("SUCCESS");
            toaster.show(true, message);
          }
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
            if (response?.data.expired) {
              console.log("EXPIRED");
              const { config } = error;
              try {
                const data =
                  config && (await retryRequestByFreshTokens(config));
                if (data?.data) return data;
              } catch (err) {
                console.log(err);
              }
            }
            const { message, success } = response?.data || {};
            console.log("request");

            if (message !== undefined && success !== undefined) {
              console.log("message");
              toaster.show(success, message);
            }

            // TODO: If timeout show timeout error.
            if (status == "408") {
              toaster.show(false, "Request timed out");
            }
          }

          console.log("reject it");
          return Promise.reject(error);
        }
      ),
    []
  );

  useMemo(
    () =>
      axiosInstance.interceptors.request.use((config) => {
        const { accessToken } = user?.tokens || {};

        if (accessToken) {
          config.headers.authorization = `Bearer ${accessToken}`;
        }
        return config;
      }),
    []
  );

  return { axiosInstance };
}

export default useAxios;
