import { useContext, useRef, useState } from "react";
import { AuthStore } from "./store/AuthContext";

export function ExpenseForm() {
  const{userInfo,setUserInfo}=useContext(AuthStore)
  const [toast,setToast]=useState("")
  const userId=userInfo.userId;
     const type=useRef();
     const price=useRef();
     const description =useRef()
  const [showForm, setShowForm] = useState(false);
async function addExpenseHandler(e){
  e.preventDefault();

 
  const data={
    type:type.current.value,
    price:price.current.value,
    description:description.current.value,
  }
 if(!data.type||!data.price||!data.description){
   setToast("Please fill all the Feild");
   setTimeout(()=>{
    setToast("")
   },1500)
   return
 }
 setToast("")
 const req=await fetch(`http://localhost:8888/expense/${userId}`,{
  method:"POST",
  body:JSON.stringify(data),
  headers:{
    "Content-Type":"application/json"
  }
 })
 if(req.ok){
  setToast("Expense Sucessfully Added")
  
 }
 else{
  setToast("Something Went Wrong");
 }
 setTimeout(()=>{
  setToast("")
 },1500)

}
  return (
    <div className="px-4 py-6">
{toast && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
    {toast}
  </div>
)}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md mx-auto">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 font-medium"
          >
            Add Expense
          </button>
        ) : (
          <>
            <h1 className="text-xl font-bold text-gray-800 text-center mb-4">
              Add Expense
            </h1>

            <form onSubmit={addExpenseHandler} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Expense Type
                </label>
                <select ref={type}className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="petrol">Petrol</option>
                  <option value="food">Food</option>
                  <option value="shopping">Shopping</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Description
                </label>
                <input
                ref={description}
                  type="text"
                  placeholder="e.g. Grocery shopping"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Spent Amount
                </label>
                <input
                ref={price}
                  type="number"
                  placeholder="e.g. 500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 font-medium"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
 