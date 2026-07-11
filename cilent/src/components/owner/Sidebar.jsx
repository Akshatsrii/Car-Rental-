import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser, logout } = useAppContext();
  const location = useLocation();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ UPDATE USER PROFILE IMAGE
  const updateImage = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(
        "/api/user/update-image", // ✅ USER IMAGE API
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Profile image updated");
        setImage(null);
        fetchUser(); // 🔥 reload user from DB
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-200 text-sm bg-white z-40">

      {/* LOGO */}
      <div className="flex items-center gap-2 mb-8 select-none">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3C13 6.8 11.5 6 10 6H4c-1.1 0-2 .9-2 2v8c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        </div>
        <span className="text-base font-black text-gray-900 tracking-tight max-md:hidden">
          Car<span className="text-primary font-extrabold">Dekho</span>
        </span>
      </div>

      {/* PROFILE IMAGE */}
      <div className="relative group">
        <label htmlFor="profile-image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image
                ? `${import.meta.env.VITE_BASE_URL}/${user.image}`
                : assets.user_icon
            }
            alt="profile"
            className="w-20 h-20 rounded-full object-cover cursor-pointer border"
          />

          <input
            type="file"
            id="profile-image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {image && (
          <button
            onClick={updateImage}
            disabled={loading}
            className="absolute -top-2 -right-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-full"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        )}
      </div>

      {/* USER NAME */}
      <p className="mt-3 text-base font-semibold max-md:hidden">
        {user?.name || "Owner"}
      </p>

      {/* MENU */}
      <div className="w-full mt-4">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 transition
              ${
                link.path === location.pathname
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <img
              src={
                link.path === location.pathname
                  ? link.coloredIcon
                  : link.icon
              }
              alt=""
              className="w-5"
            />
            <span className="max-md:hidden">{link.name}</span>
          </NavLink>
        ))}
        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition mt-6 border-t border-gray-100 font-medium"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="max-md:hidden">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
