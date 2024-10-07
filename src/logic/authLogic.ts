import { authService } from "../services/auth/authService";
import { persistService } from "../services/perssist/perssistService";
import { useAppStore } from "../store";

export const authLogic = {
  init: async () => {
    const token = await persistService.getToken();
    const userId = await persistService.getUserId();
    if (token && userId) {
      useAppStore.getState().onLogin(token, userId);
    }
  },

  login: async (username: string, password: string) => {
    // API:
    const res = await authService.login(username, password);

    // Store:
    if (res.success) {
      useAppStore.getState().onLogin(res.token, res.userId);
    }

    // Persist:
    persistService.setToken(res.token);
    persistService.setUserId(res.userId);

    return res;
  },

  signup: async (username: string, email: string, password: string) => {
    const res = await authService.signup(username, email, password);

    if (res.success) {
      useAppStore.getState().onLogin(res.token, res.userId);
    }

    // Persist:
    persistService.setToken(res.token);
    persistService.setUserId(res.userId);
    persistService.setUserName(username);
    return res;
  },

  logout: async () => {
    // THINK: do we need to call the API to logout?
    persistService.removeToken();
    persistService.removeUserId();
    useAppStore.getState().onLogout();
  },
};
