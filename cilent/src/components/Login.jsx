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
          ? { name, email, password }
          : { email, password };

      const { data } = await axios.post(url, payload);

      if (!data.success) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      // ✅ SUCCESS FLOW
      localStorage.setItem("token", data.token);
      setToken(data.token);
      await fetchUser();

      toast.success(
        state === "Sign Up"
          ? "Account created successfully"
          : "Login successful"
      );

      setShowLogin(false);

      // ✅ OPTIONAL REDIRECT (recommended)
      navigate("/"); // or "/owner" if you want direct dashboard
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
