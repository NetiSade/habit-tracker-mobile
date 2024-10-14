import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "userId";
const USER_NAME_KEY = "username";

export const persistService = {
  setUserId: (userId: string) => AsyncStorage.setItem(USER_ID_KEY, userId),
  getUserId: () => AsyncStorage.getItem(USER_ID_KEY),
  removeUserId: () => AsyncStorage.removeItem(USER_ID_KEY),
  setUserName: (username: string) =>
    AsyncStorage.setItem(USER_NAME_KEY, username),
  getUserName: () => AsyncStorage.getItem(USER_NAME_KEY),
  removeUserName: () => AsyncStorage.removeItem(USER_NAME_KEY),
};
