import axios from "axios";

const axiosInstance = axios.create({
  // Default configuration options go here
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to refresh the access token
async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken'); // Get the refresh token from your store or local storage

    // Make an API request to refresh the token
    const response = await axios.post('/user/auth/refresh/', { refresh: refreshToken });
    const newAccessToken = response.data.access;

    // Update the access token in your store or local storage
    localStorage.setItem('accessToken', newAccessToken);

    // Retry the original request with the updated access token
    return Promise.resolve();
  } catch (error) {
    // Handle the error if refreshing the token fails
    return Promise.reject(error);
  }
}

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Add authorization header or any other logic you need
    // For example, add the access token to the request headers
    const accessToken = localStorage.getItem('accessToken'); // Get the access token from your store or local storage
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && window.location.pathname !== '/auth') {
      originalRequest._retry = true;

      try {
        // Refresh the access token
        await refreshAccessToken();

        // Retry the original request with the updated access token
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle the error if refreshing the token fails
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
