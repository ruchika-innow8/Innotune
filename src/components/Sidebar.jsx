import React from "react";
import { NavLink } from "react-router-dom";

const navItemBase =
  "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-black/90 border-r border-neutral-800 overflow-y-auto">
      <div className="px-4 py-4">
        <h1 className="text-white font-bold text-lg">Innotune</h1>
      </div>
      <nav className="px-2 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "bg-neutral-800 text-white" : ""}`
          }
        >
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "bg-neutral-800 text-white" : ""}`
          }
        >
          <span>Search</span>
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "bg-neutral-800 text-white" : ""}`
          }
        >
          <span>Your Library</span>
        </NavLink>
      </nav>
      <div className="mt-4 px-2">
        <h2 className="text-neutral-400 text-xs font-semibold px-2 mb-2 uppercase tracking-wider">
          Playlists
        </h2>
        <NavLink
          to="/create-playlist"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "bg-neutral-800 text-white" : ""}`
          }
        >
          <span>Create Playlist</span>
        </NavLink>
        <NavLink
          to="/liked"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? "bg-neutral-800 text-white" : ""}`
          }
        >
          <span>Liked Songs</span>
        </NavLink>
      </div>
      <div className="h-20" />
    </aside>
  );
};

export default Sidebar;
