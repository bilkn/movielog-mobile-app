import axios from "axios";
import { useCallback, useMemo } from "react";
import { useSecureStore, useUser } from ".";
import Toast from "react-native-root-toast";

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

  const showToastMessage = (success, message) => {
    Toast.show(message, {
      backgroundColor: "#151823",
      // rgba(0, 0, 0, 0.05),
      shadowColor: "#0000000d",
      shadow: true,
      duration: Toast.durations.LONG,
      textColor: success ? "white" : "#FF3B30",
      position: 50,
      animation: true,
    });
  };

  // TODO: Add connection interceptor to prevent unnecessary requests.

  axiosInstance.interceptors.response.use(
    (response) => {
      const { message } = response?.data || {};
      if (message !== undefined) {
        showToastMessage(true, message);
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
            const data = config && (await retryRequestByFreshTokens(config));
            if (data?.data) return data;
          } catch (err) {
            console.log(err);
          }
        }
        const { message, success } = response?.data || {};

        if (message !== undefined && success !== undefined) {
          showToastMessage(false, message);
        }

        // TODO: If timeout show timeout error.
        if (status == "408") {
          showToastMessage(false, "Request timed out");
        }
      }

      console.log("reject it");
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.request.use((config) => {
    const { accessToken } = user?.tokens || {};

    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return { axiosInstance };
}

export default useAxios;
