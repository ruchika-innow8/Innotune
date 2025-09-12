import React from "react";
import { Outlet } from "react-router-dom";

const LayoutBeforeLogin = () => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    {/* <header className="bg-black text-white p-4 text-center">
      <h1>Welcome to Innotune</h1>
    </header> */}
    <main
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Outlet />
    </main>
    {/* <footer className="bg-black text-white p-4 text-center">
      © 2025 Innotune
    </footer> */}
  </div>
);

export default LayoutBeforeLogin;
