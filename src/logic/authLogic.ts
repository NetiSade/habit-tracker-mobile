import { authService } from "../services/auth/authService";
import { useAppStore } from "../store";

export const authLogic = {
  init: async () => {
    try {
      const res = await authService.silentLogin();

      if (res && res.userId) {
        useAppStore.getState().onLoginSuccess(res.userId);
      }
    } catch (error) {
      console.error("Silent login failed:", error);
      useAppStore.getState().onLogout();
    }
  },

  login: async (username: string, password: string) => {
    // API:
    const res = await authService.login(username, password);

    // Store:
    if (res.success) {
      useAppStore.getState().onLoginSuccess(res.userId);
    }

    return res;
  },

  signup: async (username: string, email: string, password: string) => {
    const res = await authService.signup(username, email, password);

    if (res.success) {
      useAppStore.getState().onLoginSuccess(res.userId);
    }

    return res;
  },

  logout: async () => {
    // THINK: do we need to call the API to logout?
    await authService.logout();
    useAppStore.getState().onLogout();
  },
};
