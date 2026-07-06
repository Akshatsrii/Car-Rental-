import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "./context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setShowLogin, axios, setToken, fetchUser } = useAppContext();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-lg shadow-xl w-[380px] relative"
      >
        {/* CLOSE */}
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* LOGO */}
        <img src={assets.logo} alt="Logo" className="h-10 mx-auto mb-6" />

        <h2 className="text-2xl font-bold text-center mb-6">
          {state === "Login" ? "Welcome Back" : "Create Account"}
        </h2>

        {/* ROLE SELECTION */}
        <div className="mb-3">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Sign in as
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-3 rounded-lg bg-white text-sm outline-none"
          >
            <option value="customer">Customer / Passenger</option>
            <option value="driver">Driver</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* ADMIN SECRET CODE */}
        {(role === "admin" || role === "super_admin") && (
          <input
            type="password"
            placeholder="Admin Secret Code"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            required
            className="w-full border p-3 rounded-lg mb-3 outline-none"
          />
        )}

        {/* NAME */}
        {state === "Sign Up" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-3 rounded-lg mb-3"
          />
        )}

        {/* PHONE */}
        {state === "Sign Up" && (
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border p-3 rounded-lg mb-3"
          />
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-3 rounded-lg mb-3"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border p-3 rounded-lg mb-5"
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Please wait..." : state}
        </button>

        {/* TOGGLE */}
        <div className="text-center mt-5 text-sm">
          {state === "Login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setState("Sign Up")}
                className="text-primary font-semibold"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setState("Login")}
                className="text-primary font-semibold"
              >
                Login
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
