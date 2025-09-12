import React from "react";

const Header = ({ title = "Good afternoon" }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-[#121212]/80 backdrop-blur supports-[backdrop-filter]:bg-[#121212]/60 px-6 py-4 border-b border-neutral-800">
      <h2 className="text-white text-xl font-bold">{title}</h2>
      <div className="flex items-center gap-4">
        <button className="text-sm text-neutral-300 hover:text-white">
          Upgrade
        </button>
        <div className="w-8 h-8 rounded-full bg-neutral-700" />
      </div>
    </header>
  );
};

export default Header;
