import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <div className="bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl px-6 py-3 mx-4 my-4 flex items-center justify-between text-sm text-gray-700">
      <span className="tracking-wide">Welcome to Expense Tracker</span>
      <span>
        Your profile is incomplete.{" "}
        <NavLink
          to="/profile"
          className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition duration-200"
        >
          Complete now
        </NavLink>
      </span>
    </div>
  );
}
