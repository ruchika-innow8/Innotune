// src/api/authApi.js

/** 
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const loginUser = (credentials) => API.post("/users/login", credentials);
export const registerUser = (userData) => API.post("/users/register", userData);
*/

// src/api/authApi.js
// const API = axios.create({ baseURL: "http://localhost:5000/api" });
// Comment axios for now

// --- MOCK AUTH API ---

// Fake user DB (you can expand this later)
const fakeUsers = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@innotune.com",
    phone: "1234567890",
    password: "Demo@123", // same rules as your form
    is_artist: false,
  },
];

// fake token generator
const generateToken = (user) => `fake-jwt-token-${user.id}`;

// fake login
export const loginUser = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = fakeUsers.find(
        (u) =>
          (u.email === credentials.email || u.phone === credentials.phone) &&
          u.password === credentials.password
      );
      if (user) {
        resolve({
          data: {
            user,
            token: generateToken(user),
          },
        });
      } else {
        reject({ response: { data: { message: "Invalid credentials" } } });
      }
    }, 800); // fake delay
  });
};

// fake register
export const registerUser = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = fakeUsers.some(
        (u) => u.email === userData.email || u.phone === userData.phone
      );
      if (exists) {
        reject({ response: { data: { message: "User already exists" } } });
      } else {
        const newUser = {
          id: fakeUsers.length + 1,
          is_artist: false,
          ...userData,
        };
        fakeUsers.push(newUser);
        resolve({
          data: {
            user: newUser,
            token: generateToken(newUser),
          },
        });
      }
    }, 800); // fake delay
  });
};
