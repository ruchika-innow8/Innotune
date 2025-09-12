import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const loginUser = (credentials) => API.post("/users/login", credentials);
export const registerUser = (userData) => API.post("/users/register", userData);
