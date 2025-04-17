import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [error, setError] = useState("");
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate=useNavigate();

  function signUpHandler(e) {
    e.preventDefault();
    const emaill = email.current.value;
    const passwordd = password.current.value;
    const confirmPasswordd = confirmPassword.current.value;

    const isValid = validator(emaill, passwordd, confirmPasswordd);
    if (!isValid){
        setTimeout(()=>{
            setError("")
        },1500)
        return;
    }
        
       
    navigate('/login')
  
    console.log("Sign Up Successful!");
  }

  function validator(email, password, confirmPassword) {
    if (email.length < 5 || !email.includes("@")) {
      setError("Please provide a valid email.");
      return false;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    } else if (password !== confirmPassword) {
      setError("Password and Confirm Password must match.");
      return false;
    } else {
      setError(""); 
      return true;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
        <form onSubmit={signUpHandler} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            ref={email}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            ref={password}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPassword}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="bg-red-100 text-red-600 border border-red-300 px-4 py-2 rounded-xl text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <button className="mt-4 text-blue-500 hover:underline w-full text-center">
          Have an account? Login
        </button>
      </div>
    </div>
  );
}
