import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "./context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setShowLogin, axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        state === "Sign Up"
          ? "/api/user/register"
          : "/api/user/login";

      const payload =
        state === "Sign Up"
          ? { name, email, password, role, secretCode, phone }
          : { email, password, secretCode };

      const { data } = await axios.post(url, payload);

      if (!data.success) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      // ✅ SUCCESS FLOW
      localStorage.setItem("token", data.token);
      setToken(data.token);
      
      // Fetch user profile to read role
      const { data: userProfileData } = await axios.get("/api/user/me", {
        headers: { Authorization: `Bearer ${data.token}` }
      });

      toast.success(
        state === "Sign Up"
          ? "Account created successfully"
          : "Login successful"
      );

      setShowLogin(false);

      if (userProfileData.success && userProfileData.user) {
        const u = userProfileData.user;
        if (u.role === "admin" || u.role === "super_admin") {
          navigate("/owner");
        } else if (u.role === "driver") {
          navigate("/driver");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `${state} failed, try again`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 max-w-sm w-full relative overflow-hidden animate-scaleUp"
      >
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary to-blue-400"></div>

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50 transition"
        >
          ✕
        </button>

        {/* LOGO */}
        <div className="flex justify-center mb-4 mt-2">
          <img src={assets.logo} alt="Logo" className="h-9 object-contain" />
        </div>

        <h2 className="text-2xl font-black text-center text-gray-900 mb-6">
          {state === "Login" ? "Welcome Back" : "Join the Ride"}
        </h2>

        {/* ROLE SELECTION */}
        <div className="mb-4">
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
            Sign in as
          </label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border-2 border-gray-100 hover:border-gray-200 focus:border-primary rounded-xl px-4 py-3 bg-white text-xs font-bold outline-none appearance-none cursor-pointer transition"
            >
              <option value="customer">Passenger Partner</option>
              <option value="driver">Driver Partner</option>
              <option value="admin">Administrator</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* ADMIN SECRET CODE */}
        {(role === "admin" || role === "super_admin") && (
          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Admin Secret Code"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              required
              className="w-full border-2 border-gray-100 hover:border-gray-200 focus:border-primary rounded-xl pl-10 pr-4 py-3 text-xs font-bold outline-none transition"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔒</span>
          </div>
        )}

        {/* NAME */}
        {state === "Sign Up" && (
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border-2 border-gray-100 hover:border-gray-200 focus:border-primary rounded-xl pl-10 pr-4 py-3 text-xs font-bold outline-none transition"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">👤</span>
          </div>
        )}

        {/* PHONE */}
        {state === "Sign Up" && (
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border-2 border-gray-100 hover:border-gray-200 focus:border-primary rounded-xl pl-10 pr-4 py-3 text-xs font-bold outline-none transition"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">📞</span>
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-4 relative">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-2 border-gray-100 hover:border-gray-200 focus:border-primary rounded-xl pl-10 pr-4 py-3 text-xs font-bold outline-none transition"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">✉️</span>
        </div>

        {/* PASSWORD */}
        <div className="mb-6 relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border-2 border-gray-100 hover:border-gray-200 focus:border-primary rounded-xl pl-10 pr-4 py-3 text-xs font-bold outline-none transition"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔑</span>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-primary-dull hover:from-primary-dull hover:to-primary text-white py-3.5 rounded-xl font-bold text-xs shadow-lg hover:shadow-xl transition transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span>{state === "Login" ? "Sign In" : "Sign Up"}</span>
          )}
        </button>

        {/* TOGGLE */}
        <div className="text-center mt-5 text-xs text-gray-500 font-semibold">
          {state === "Login" ? (
            <>
              New to CarDekho?{" "}
              <button
                type="button"
                onClick={() => setState("Sign Up")}
                className="text-primary hover:underline font-bold"
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button
                type="button"
                onClick={() => setState("Login")}
                className="text-primary hover:underline font-bold"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
