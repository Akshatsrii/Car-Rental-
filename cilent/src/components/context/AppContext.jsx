import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "https://car-rental-6nge.onrender.com";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // ✅ FETCH LOGGED IN USER
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/me"); // 🔥 FIXED ROUTE

      if (data.success) {
        setUser(data.user); // 🔥 MOST IMPORTANT LINE
      }
    } catch (error) {
      console.log("fetchUser error:", error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];
      }
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  // ✅ ON FIRST LOAD (PAGE REFRESH)
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${savedToken}`;
      fetchUser();
    }
  }, []);

  // ✅ ON LOGIN / TOKEN CHANGE
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser(); // 🔥 LOGIN KE BAAD USER LOAD HOGA
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        axios,
        token,
        setToken,
        user,
        setUser,
        showLogin,
        setShowLogin,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
