import { Platform } from "react-native";

export const getApiUrl = () => {
  if (__DEV__) {
    // Use the appropriate IP address based on the platform
    if (Platform.OS === "android") {
      return "http://10.0.2.2:3000"; // Special IP for Android emulator
    } else {
      return "http://localhost:3000"; // For iOS simulator or web
    }
  } else {
    // Use your production server URL
    return "https://your-production-server.com";
  }
};
