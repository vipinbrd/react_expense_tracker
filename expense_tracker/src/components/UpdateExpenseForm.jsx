import { useState } from "react";
import { createPortal } from "react-dom";

export function UpdateExpenseForm({ data, setData }) {
  const [price, setPrice] = useState(data.price);
  const [type, setType] = useState(data.type);
  const [description, setDescription] = useState(data.description);
  const [toast, setToast] = useState("");

  function updateExpenseHandler(e) {
    e.preventDefault();
   
    const dto={
        id:data.id,
        price,
        type,
        description,

    }

    fetch(`http://localhost:8888/expense/${data.id}`,{
        method:"PUT",
        body:JSON.stringify(dto),
        headers:{
            "Content-Type":"application/json"
        }
    })
  .then((re)=>{
    if(re.ok){
        setToast("Expense updated successfully!");
    }
    else{
        setToast("SOmething went wrong..")
    }
  })
 
   

    setTimeout(() => {
      setToast("");
      setData(""); // close modal
    }, 1500);
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md z-50 animate-fade-in">
        {toast && (
          <p className="text-green-600 text-center font-semibold mb-4">
            {toast}
          </p>
        )}

        <form onSubmit={updateExpenseHandler} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Expense Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="e.g. 500"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between items-center gap-4 mt-2">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 font-medium"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setData("")}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.querySelector("#backdrop")
  );
}
