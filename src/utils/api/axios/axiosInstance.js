import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
