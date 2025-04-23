import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthStore } from "./store/AuthContext";
import { ExpenseForm } from "./ExpenseFrom";

export function NavBar() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AuthStore);

  function logoutHandler() {
    localStorage.removeItem("userInfo");
    setUserInfo({});
    navigate("/login");
  }

  return (
    <>
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

      <button
        onClick={logoutHandler}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 shadow-sm"
      >
        Logout
      </button>
    </div>
    <ExpenseForm/>
    </>
  );
}
