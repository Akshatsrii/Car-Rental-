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
      {/* Left section empty to push Welcome text to the right */}
      <div></div>

      {/* USER NAME */}
      <p className="font-medium">
        Welcome, {user?.name || "Owner"}
      </p>
    </div>
  );
};

export default NavbarOwner;
