import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const NavbarOwner = () => {
  const { user, token, fetchUser } = useAppContext();

  // 🔥 Ensure user loads after login / refresh
  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        {/* SVG Sports Car Logo Silhouette */}
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3C13 6.8 11.5 6 10 6H4c-1.1 0-2 .9-2 2v8c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        </div>
        <span className="text-base font-black text-gray-900 tracking-tight">
          Car<span className="text-primary font-extrabold">Dekho</span>
        </span>
      </Link>

      {/* USER NAME */}
      <p className="font-medium">
        Welcome, {user?.name || "Owner"}
      </p>
    </div>
  );
};

export default NavbarOwner;
