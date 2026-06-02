import axios from "axios";

const api = axios.create({
  baseURL: "https://shopy5.onrender.com/api",
});

export default api;