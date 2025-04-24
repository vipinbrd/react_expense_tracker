import { useContext, useEffect, useState } from "react";
import { AuthStore } from "./store/AuthContext";
import { UpdateExpenseForm } from "./UpdateExpenseForm";

export function Expenses({isChange}) {
  const [expenses, setExpenses] = useState([]);
  const { userInfo } = useContext(AuthStore);
  const userId = userInfo.userId;
  const [loading, setIsLoading] = useState(true);
  const [toast,setToast]=useState("")
  const [isChanged,setIschanged]=useState(false);
  const [updatedata,setUpdateData]=useState("");
  

  function fetchData() {
    fetch(`http://localhost:8888/expense/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setExpenses(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, [isChange,isChanged,updatedata]);

function expenseDeleteHandler(exenseId){
 
    fetch(`http://localhost:8888/expense/${exenseId}`,
       {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
       } 
    ).then((res)=>{
        setToast("Delete Successfull")
        setIschanged((pre)=>!pre)
        
    }).catch((res)=>{
        setToast("Delete Fails try after sometime")
    })
    setTimeout(()=>{
        setToast("")
    },1000)

}

function expenseUpdateHandler(ele){
    setUpdateData(ele)
}

  return (
    <div className="p-6 min-h-screen bg-gray-100">
 {updatedata&&<UpdateExpenseForm data={updatedata} setData={setUpdateData}/>}

        {toast && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
    {toast}
  </div>)}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">My Expenses</h1>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : expenses.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No expenses found.</p>
      ) : (
<ul className="relative border-l border-gray-300 ml-4">
  {expenses.map((ele) => (
    <li key={ele.id} className="mb-10 ml-4">
      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 border border-white"></div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">{ele.type}</h3>
        <p className="text-gray-600">{ele.description}</p>
        <p className="text-blue-600 font-bold mt-1">₹{ele.price}</p>
        <div className="mt-3 flex gap-2">
          <button onClick={()=>expenseDeleteHandler(ele.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          <button onClick={()=>expenseUpdateHandler(ele)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
        </div>
      </div>
    </li>
  ))}
</ul>
      )}
    </div>
  );
}
