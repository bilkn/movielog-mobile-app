import axios from "axios";
import { useSecureStore, useUser } from ".";

const baseURL = process.env.REACT_APP_AUTH_BASE_URL;

const axiosAuthInstance = axios.create({
  baseURL,
  timeout: 10000,
});

function useAuthAxios() {
  const { signOut, setUser } = useUser();
  const secureStore = useSecureStore();

  const refreshTokens = async () => {
    const { refreshToken } = secureStore.getValueFor("tokens");

    if (refreshToken) {
      try {
        const data = await axiosAuthInstance.post("/token", { refreshToken });
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
      axiosAuthInstance.request(config);
    } catch (err) {
      console.log(e);
    }
  };

  axiosAuthInstance.interceptors.response.use(
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

  return { axiosAuthInstance };
}

export default useAuthAxios;
