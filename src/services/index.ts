import axios from "axios";

// Create the main request instance
const mainRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export default mainRequest;
