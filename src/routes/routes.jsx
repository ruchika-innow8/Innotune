import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES_BEFORE_LOGIN, ROUTES_AFTER_LOGIN } from "./routesFunction";

import LayoutBeforeLogin from "../layout/LayoutBeforeLogin";
import LayoutAfterLogin from "../layout/LayoutAfterLogin";

// --- Helper to wrap element with its guard ---
const wrapWithGuard = (route) => {
  if (route.guard) {
    const Guard = route.guard;
    return <Guard element={route.element} />;
  }
  return route.element;
};

// --- Public routes wrapped in LayoutBeforeLogin ---
const publicRoutes = {
  element: <LayoutBeforeLogin />,
  children: ROUTES_BEFORE_LOGIN.map((route) => ({
    path: route.path,
    element: wrapWithGuard(route),
  })),
};

// --- Protected routes wrapped in LayoutAfterLogin ---
const protectedRoutes = {
  element: <LayoutAfterLogin />,
  children: ROUTES_AFTER_LOGIN.map((route) => ({
    path: route.path,
    element: wrapWithGuard(route),
  })),
};

// --- Combine all routes ---
const allRoutes = [publicRoutes, protectedRoutes];

// --- Fallback route (redirect to dashboard if unknown route) ---
allRoutes.push({
  path: "*",
  element: <div>Page Not Found. Redirecting...</div>,
});

// --- Export router ---
export const router = createBrowserRouter(allRoutes);
