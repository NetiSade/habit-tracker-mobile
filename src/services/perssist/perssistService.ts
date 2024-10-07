import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";
const USER_ID_KEY = "userId";
const USER_NAME_KEY = "username";

export const persistService = {
  setToken: (token: string) => {
    AsyncStorage.setItem(TOKEN_KEY, token);
  },
  getToken: () => {
    return AsyncStorage.getItem(TOKEN_KEY);
  },
  removeToken: () => {
    AsyncStorage.removeItem(TOKEN_KEY);
  },
  setUserId: (userId: string) => {
    AsyncStorage.setItem(USER_ID_KEY, userId);
  },
  getUserId: () => {
    return AsyncStorage.getItem(USER_ID_KEY);
  },
  removeUserId: () => {
    AsyncStorage.removeItem(USER_ID_KEY);
  },
  setUserName: (username: string) => {
    AsyncStorage.setItem(USER_NAME_KEY, username);
  },
  getUserName: () => {
    return AsyncStorage.getItem(USER_NAME_KEY);
  },
  removeUserName: () => {
    AsyncStorage.removeItem(USER_NAME_KEY);
  },
};
