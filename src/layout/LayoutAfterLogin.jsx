import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside
    style={{
      width: "250px",
      background: "#111",
      color: "#fff",
      padding: "1rem",
    }}
  >
    <h2>Menu</h2>
    <ul style={{ listStyle: "none", padding: 0 }}>
      <li>
        <NavLink to="/" style={{ color: "#fff" }}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" style={{ color: "#fff" }}>
          Home
        </NavLink>
      </li>
    </ul>
  </aside>
);

const LayoutAfterLogin = () => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />
    <main style={{ flex: 1, padding: "1rem" }}>
      <Outlet />
    </main>
  </div>
);

export default LayoutAfterLogin;
