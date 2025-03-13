import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:15510/",
  headers: {
    "Content-Type": "application/json",
  },
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
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      console.log("Unauthorized! Logging out...");
      localStorage.removeItem("accessToken"); // Remove invalid token
      window.location.href = "http://localhost:4000"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) =>
//     Promise.reject(
//       (error.response && error.response.data) || "Something went wrong"
//     )
// );

export default axiosInstance;
