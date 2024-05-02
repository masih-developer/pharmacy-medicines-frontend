import axios from "axios";

// Create the main request instance
const mainRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

mainRequest.interceptors.request.use(
  (res) => res,
  (error) => Promise.reject(error)
);

mainRequest.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalConfig = error.config;

    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/refresh`,
          { withCredentials: true }
        );
        if (data) {
          mainRequest(originalConfig);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
);

export default mainRequest;
