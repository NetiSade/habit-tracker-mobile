import axios from "axios";
import { getApiUrl } from "./utils";
import { useAppStore } from "../../store";

const API_URL = getApiUrl();

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAppStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
