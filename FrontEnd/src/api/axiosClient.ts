import axios, { AxiosInstance } from "axios";
const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8888/v1/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
