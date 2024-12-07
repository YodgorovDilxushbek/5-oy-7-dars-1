import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.exchangerate.host", // API asosiy URL manzili
  timeout: 10000, // Maksimal kutish vaqti (ms)
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
