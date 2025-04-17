import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-600">My Store</h1>
      <div className="flex gap-6">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 transition duration-300 ${
              isActive ? "font-semibold border-b-2 border-blue-500" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/product"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 transition duration-300 ${
              isActive ? "font-semibold border-b-2 border-blue-500" : ""
            }`
          }
        >
          Product
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 transition duration-300 ${
              isActive ? "font-semibold border-b-2 border-blue-500" : ""
            }`
          }
        >
          About Us
        </NavLink>
      </div>
    </nav>
  );
}
