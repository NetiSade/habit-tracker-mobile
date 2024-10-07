import { useAppStore } from "../../store";
import { apiClient } from "../api_core/apiClient";

const LOG_PREFIX = "[AuthService]";

export const authService = {
  login: async (username: string, password: string) => {
    try {
      const response = await apiClient.post("/login", { username, password });
      const { token, userId } = response.data;
      return { success: true, token, userId };
    } catch (error) {
      console.error(LOG_PREFIX, "Login failed:", error);
      return { success: false, error: error };
    }
  },

  signup: async (username: string, email: string, password: string) => {
    try {
      const response = await apiClient.post("/signup", {
        username,
        email,
        password,
      });

      const { token, user } = response.data;

      return { success: true, token, userId: user.id };
    } catch (error) {
      console.error(LOG_PREFIX, "Signup failed:", error);
      return {
        success: false,
        error: error,
      };
    }
  },
};
