import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
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
    <div className="fixed left-0 top-16 min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-200 text-sm bg-white z-40">

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
                  ? "bg-blue-50 text-blue-600 font-medium"
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
      </div>
    </div>
  );
};

export default Sidebar;
