import axios from "axios";
import { apiClient } from "../api_core/apiClient";
import { tokenStorage } from "../perssist/tokenStorage";

const LOG_PREFIX = "[AuthService]";

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/login", { email, password });
      const { accessToken, refreshToken, user } = response.data;

      await tokenStorage.storeTokens({ accessToken, refreshToken });

      return { success: true, userId: user.id };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error,
      };
    }
  },

  signup: async (username: string, email: string, password: string) => {
    try {
      const response = await apiClient.post("/signup", {
        username,
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      await tokenStorage.storeTokens({ accessToken, refreshToken });

      return { success: true, userId: user.id };
    } catch (error) {
      console.error(LOG_PREFIX, "Signup failed:", error);
      return {
        success: false,
        error: error,
      };
    }
  },

  silentLogin: async () => {
    try {
      const accessToken = await tokenStorage.getAccessToken();

      const refreshToken = await tokenStorage.getRefreshToken();

      if (!accessToken || !refreshToken) {
        return { success: false, userId: null };
      }

      try {
        const response = await apiClient.get("/verify-token");
        return { success: response.data.isValid, userId: response.data.userId };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 401) {
            try {
              const refreshResponse = await apiClient.post("/refresh-token", {
                refreshToken,
              });
              const newAccessToken = refreshResponse.data.accessToken;
              await tokenStorage.storeTokens({
                accessToken: newAccessToken,
                refreshToken,
              });
              return { success: true, userId: refreshResponse.data.userId };
            } catch (refreshError) {
              console.error("Token refresh failed:", refreshError);
              await tokenStorage.clearTokens();
              return { success: false, userId: null };
            }
          }
        }
        throw error; // Re-throw if it's not a 401 error
      }
    } catch (error) {
      console.error("Silent login failed:", error);
      await tokenStorage.clearTokens();
      return false;
    }
  },

  logout: async () => {
    await tokenStorage.clearTokens();
  },
};
