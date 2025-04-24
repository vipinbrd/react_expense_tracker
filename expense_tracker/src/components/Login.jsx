import { useContext, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthStore } from "./store/AuthContext";

export function Login() {
  const {userInfo,setUserInfo}=useContext(AuthStore)
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loginHandler(e) {
    e.preventDefault();

    const payload = {
      username: email.current.value,
      password: password.current.value,
    };

    try {
      const request = await fetch("http://localhost:8888/user/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!request.ok) {
        throw new Error("bad Credentials");
      }

      const response = await request.json();
    
      setUserInfo(response)
      localStorage.setItem("userInfo",JSON.stringify(response))

      setSuccess("Login successful!");
      navigate("/home");
    } catch (err) {
      console.log(err)
      setError("Invalid credentials");
      setSuccess("");
      setTimeout(() => setError(""), 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form onSubmit={loginHandler} className="flex flex-col gap-4">
          <input
            ref={email}
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <p className="bg-red-100 text-red-600 border border-red-300 px-4 py-2 rounded-xl text-sm text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-green-100 text-green-700 border border-green-300 px-4 py-2 rounded-xl text-sm text-center">
              {success}
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex flex-col items-center gap-2 text-sm">
          <NavLink to="/forget" className="text-blue-500 hover:underline">
            Forgot Password?
          </NavLink>
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Don't have an account? Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
}
