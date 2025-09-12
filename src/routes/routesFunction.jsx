/* eslint-disable react-refresh/only-export-components */

import React from "react";
import { Navigate } from "react-router-dom";

// --- Pages ---
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard";

// --- Auth check ---
export const isSignin = () => !!localStorage.getItem("authToken");

// --- Route guards ---
export const ProtectedRouteForAfterLogin = ({ element }) =>
  isSignin() ? element : <Navigate to="/login" replace />;

export const ProtectedRouteForBeforeLogin = ({ element }) =>
  !isSignin() ? element : <Navigate to="/" replace />;

// --- Public routes ---
export const ROUTES_BEFORE_LOGIN = [
  { path: "/login", element: <Login />, guard: ProtectedRouteForBeforeLogin },
  { path: "/signup", element: <Signup />, guard: ProtectedRouteForBeforeLogin },

  // Dashboard is now PUBLIC
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
];

// --- Protected routes (add later if needed) ---
export const ROUTES_AFTER_LOGIN = [];
