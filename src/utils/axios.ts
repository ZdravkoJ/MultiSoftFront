import axios from "axios";
import { API_URL } from "../types/auth";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve token from storage
    if (accessToken) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const currentPath = window.location.pathname + window.location.search;
    localStorage.setItem("lastPath", currentPath);
    if (originalRequest.url === "auth/refresh-token") {
      // If the refresh token request fails, log out the user
      localStorage.removeItem("accessToken");
      return Promise.reject(error);
    }

    if (originalRequest.url.includes("/login")) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Make a request to your auth server to refresh the token.
        const response = await axiosInstance.get("auth/refresh-token");
        const { accessToken } = response.data;

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        localStorage.setItem("accessToken", accessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);

        localStorage.removeItem("accessToken");
        delete originalRequest._retry;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
