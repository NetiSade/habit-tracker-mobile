import * as SecureStore from "expo-secure-store";

const TOKEN_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export const tokenStorage = {
  // core
  async storeItem(key: string, value: any) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  },

  async getItem(key: string) {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  },

  async removeItem(key: string) {
    await SecureStore.deleteItemAsync(key);
  },

  // tokens
  async storeTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    await this.storeItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    await this.storeItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
  },

  async getAccessToken() {
    return await this.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  async getRefreshToken() {
    return await this.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  },

  async clearTokens() {
    await this.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    await this.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  },
};
