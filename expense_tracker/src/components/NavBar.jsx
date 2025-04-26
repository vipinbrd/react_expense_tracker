import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthStore } from "./store/AuthContext";
import { ExpenseForm } from "./ExpenseFrom";
import { Expenses } from "./Expenses";
import { useSelector } from "react-redux";

export function NavBar() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AuthStore);
  const [isDatachanged, setisDataChanged] = useState(false);
  const [percentage, setpercentage] = useState("64%");
  const [isPremiumActive, setIsPremiumActive] = useState(false); 
  const expenseList = useSelector((state) => state.expense);

  function logoutHandler() {
    localStorage.removeItem("userInfo");
    setUserInfo({});
    navigate("/login");
  }

  async function fetchData() {
    const req = await fetch(`http://localhost:8888/user/${userInfo.userId}`);
    const response = await req.json();

    if (req.ok) {
      if (response.name != null) {
        setisDataChanged("80%");
      }
      if (response.imageUrl != null) {
        setpercentage("100%");
      }
    }
  }

  useEffect(() => {
    if (userInfo.userId != null) {
      fetchData();
    }
  }, []);

  function premiumHandler() {
    setIsPremiumActive(true); 
  }

  function downloadCSV() {
    const headers = ["Type", "Description", "Price"];
    const rows = expenseList.map(ele => [ele.type, ele.description, ele.price]);
  
    let csvContent = headers.join(",") + "\n" + rows.map(row => row.join(",")).join("\n");
  
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
    
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "expenses.csv"; 
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
  
    
    URL.revokeObjectURL(url);
  }

  let sum = 0;
  expenseList.forEach((element) => {
    sum += element.price;
  });

  return (
    <>
      <div className="bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl px-6 py-3 mx-4 my-4 flex items-center justify-between text-sm text-gray-700">
        <span className="tracking-wide">Welcome to Expense Tracker</span>

        <span>
          {percentage != "100%" ? "Your profile is incomplete. " : "Your profile is complete "}
          <NavLink
            to="/profile"
            className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition duration-200"
          >
            {percentage != "100%" ? "Complete now" : "View Profile"}
          </NavLink>
        </span>

        <div className="flex gap-2">
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 shadow-sm"
          >
            Logout
          </button>

          {sum > 1000 && !isPremiumActive && (
            <button
              onClick={premiumHandler}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-200 shadow-sm"
            >
              Activate Premium
            </button>
          )}

          {isPremiumActive && (
            <button
              onClick={downloadCSV}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 shadow-sm"
            >
              Download Expenses (CSV)
            </button>
          )}
        </div>
      </div>

      <ExpenseForm onChange={setisDataChanged} />
      <Expenses isChange={isDatachanged} />
    </>
  );
}
