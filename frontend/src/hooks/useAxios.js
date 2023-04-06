import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { useSecureStore, useUser } from ".";
import { SCREENS } from "../constants/screens";
import { toaster } from "../helpers";

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;
const authBaseURL = process.env.REACT_APP_AUTH_BASE_URL;

function useAxios(options) {
  const { base } = options || {};
  const { user, signOut, setUser } = useUser();
  const navigation = useNavigation();
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
    } catch (err) {
      console.log(err)
    }
  }, []);

  const retryRequestByFreshTokens = useCallback(async (config) => {
    try {
      const { accessToken } = (await refreshTokens()) || {};
      if (!accessToken) return;

      config.headers.authorization = `Bearer ${accessToken}`;
      return axios.request(config);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // TODO: Add connection interceptor to prevent unnecessary requests.

  useMemo(
    () =>
      axiosInstance.interceptors.response.use(
        (response) => {
          const { message } = response?.data || {};
          let errorShown = false;

          if (message !== undefined) {
            toaster.show(true, message);
            errorShown = true;
          }
          return response;
        },
        async (error) => {
          const { response, request } = error;

          let errorShown = false;

          if (
            error?.code === "ECONNABORTED" ||
            error?.response?.status === "408"
          ) {
            toaster.show(false, "Request timed out");
            errorShown = true;
          }

          if (error?.message === "Network Error") {
            toaster.show(
              false,
              "There seems to be a problem with your internet connection. Please try again."
            );
            errorShown = true;
          }

          // Handles expired tokens.

          if (response) {
            if (response?.data.expired) {
              const { config } = error;
              try {
                const data =
                  config && (await retryRequestByFreshTokens(config));
                if (data?.data) return data;
              } catch (err) {
                console.log(err);
              }
            }

            if (response?.data?.refreshTokenExpired) {
              toaster.show(false, response.data.message);
              setUser(null);
              errorShown = true;
              navigation.navigate(SCREENS.SIGN_IN);
              secureStore
                .deleteItem("tokens")
                .then(() => console.log("Tokens has been deleted."))
                .catch((err) => {
                  console.log(err);
                  toaster.show(false, "An error occurred");
                });
            }

            const { message, success } = response?.data || {};

            if (message !== undefined && success !== undefined && !errorShown) {
              toaster.show(success, message);
              errorShown = true;
            }
          }

          if (!errorShown && !response?.data) {
            toaster.show(false, "An error occurred");
          }

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
