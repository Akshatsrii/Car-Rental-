import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "./context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, token, setToken, setShowLogin, axios, fetchUser } = useAppContext();

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Book Ride", path: "/cars" },
    { name: "My Bookings", path: "/mybookings" },
  ];

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Handle Become Driver click
  const handleBecomeDriver = () => {
    if (!token) {
      toast.error("Please login first");
      setShowLogin(true);
      return;
    }
    if (user && user.role === "customer") {
      setShowUpgradeModal(true);
      return;
    }
    if (user && user.role === "driver") {
      navigate("/driver");
    } else {
      navigate("/owner");
    }
  };

  // 🔹 Handle Driver Upgrade
  const handleUpgradeToOwner = async () => {
    try {
      setUpgrading(true);
      const { data } = await axios.post("/api/owner/change-role", { role: "driver" });
      if (data.success) {
        toast.success("Congratulations! You are now a Driver partner.");
        await fetchUser();
        setShowUpgradeModal(false);
        navigate("/driver");
      } else {
        toast.error(data.message || "Failed to upgrade account");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during account upgrade");
    } finally {
      setUpgrading(false);
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setShowUserMenu(false);
    setOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-5 bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
        {/* LOGO */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img src={assets.logo} alt="CarRental" className="h-11" />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {menuLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-semibold text-base transition-all duration-200 relative group ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center gap-5">
          {/* Search Bar */}
          <div className="flex items-center gap-3 border-2 border-gray-200 rounded-xl px-4 py-2.5 w-72 bg-gray-50 hover:bg-white hover:border-primary/30 transition-all duration-200 focus-within:border-primary focus-within:bg-white">
            <input
              type="text"
              placeholder="Search cars..."
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Become a Driver Button */}
          <button
            onClick={handleBecomeDriver}
            className="text-gray-700 hover:text-primary font-semibold transition-all duration-200 relative group"
          >
            Become a Driver
            <span className="absolute -bottom-1 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300"></span>
          </button>

          {/* ✅ AUTH CHECK = token ONLY */}
          {token ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 border-2 border-transparent hover:border-gray-200"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="font-semibold text-gray-800 max-w-[120px] truncate">
                  {user?.name || "Account"}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-slideDown">
                  {/* User Info Header */}
                  <div className="px-5 py-4 bg-gradient-to-r from-primary/5 to-blue-50 border-b border-gray-100">
                    <p className="text-gray-800 font-bold text-base truncate">
                      {user?.name}
                    </p>
                    <p className="text-gray-500 text-xs truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to={user?.role === "driver" ? "/driver" : (user?.role === "admin" || user?.role === "super_admin") ? "/owner" : "/"}
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-200 text-gray-700 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">
                        {user?.role === "driver" ? "Driver Dashboard" : (user?.role === "admin" || user?.role === "super_admin") ? "Admin Panel" : "My Dashboard"}
                      </span>
                    </Link>

                    <Link
                      to="/mybookings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-200 text-gray-700 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold">My Bookings</span>
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="p-3 bg-gray-50 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="px-7 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              Login
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <img
            src={open ? assets.close_icon : assets.menu_icon}
            alt="menu"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setOpen(false)}
          ></div>
          <div className="md:hidden fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 animate-slideInRight">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-transparent">
              <h2 className="font-bold text-xl text-gray-800">Menu</h2>
              <button 
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <img src={assets.close_icon} alt="close" className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col p-6 gap-2">
              {menuLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`font-semibold py-3 px-4 rounded-lg transition-all duration-200 ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <button
                onClick={() => {
                  handleBecomeDriver();
                  setOpen(false);
                }}
                className="text-left font-semibold text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Become a Driver
              </button>

              <div className="border-t border-gray-200 my-4"></div>

              {token ? (
                <>
                  <div className="py-3 px-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg mb-2">
                    <p className="text-gray-800 font-bold truncate">{user?.name}</p>
                    <p className="text-gray-500 text-sm truncate">{user?.email}</p>
                  </div>

                  <Link
                    to={user?.role === "driver" ? "/driver" : (user?.role === "admin" || user?.role === "super_admin") ? "/owner" : "/"}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    <span className="font-semibold">
                      {user?.role === "driver" ? "Driver Dashboard" : (user?.role === "admin" || user?.role === "super_admin") ? "Admin Panel" : "My Dashboard"}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setOpen(false);
                  }}
                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* UPGRADE TO HOST MODAL */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-100 relative animate-scaleUp">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Become a Driver</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Join our network of driver partners to accept ride requests and start earning extra income on your own schedule!
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  disabled={upgrading}
                  className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 rounded-xl font-semibold transition text-gray-700 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpgradeToOwner}
                  disabled={upgrading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {upgrading ? "Upgrading..." : "Upgrade Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;