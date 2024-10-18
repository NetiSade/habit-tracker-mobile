import axios from "axios";

import { getApiUrl } from "./utils";
import { tokenStorage } from "../perssist/tokenStorage";

const API_URL = getApiUrl();

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("error", error);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await tokenStorage.getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        const response = await axios.post(`${API_URL}/refresh-token`, {
          refreshToken,
        });
        const { accessToken } = response.data;

        await tokenStorage.storeTokens({ accessToken, refreshToken });

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out the user
        await tokenStorage.clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
