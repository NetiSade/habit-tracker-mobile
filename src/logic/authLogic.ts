import { authService } from "../services/auth/authService";
import { persistService } from "../services/perssist/perssistService";
import { useAppStore } from "../store";

export const authLogic = {
  init: async () => {
    try {
      const userId = await persistService.getUserId();

      if (userId) {
        // user was logged in before
        useAppStore.getState().setUserId(userId);
      }

      const res = await authService.silentLogin();

      if (res && res.userId) {
        useAppStore.getState().onLoginSuccess(res.userId);
      }
    } catch (error) {
      useAppStore.getState().onLoginFailure();
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
    await authService.logout();
    useAppStore.getState().onLogout();
  },
};
