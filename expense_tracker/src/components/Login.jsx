import { NavLink } from "react-router-dom";

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
