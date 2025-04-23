import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function ForgotPassword() {
  const email = useRef();
  const password = useRef();
  const otpref = useRef();
  const [otp, setOtp] = useState("");
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  async function forgetPasswordHandler(e) {
    event.preventDefault();
    const regemail = email.current.value;
    if (regemail.length < 5) {
      setToast("please give valid eamil");
      setTimeout(() => {
        setToast("");
      }, 1500);
      return;
    }
    if (!otp) {
      const reg = await fetch(`http://localhost:8888/forget/send/${regemail}`);
      if (reg.ok) {
        setToast("Otp Send Succesfully");
        setTimeout(() => {
          setToast("");
        }, 1500);
        setOtp(true);
      } else {
        setToast("User not Found");
        setTimeout(() => {
          setToast("");
        }, 1500);
      }
    } else {
      const e = email.current.value;
      const p = password.current.value;
      const o = otpref.current.value;

      const req2 = await fetch(
        `http://localhost:8888/update/password?email=${e}&otp=${o}&password=${p}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (req2.ok) {
        setToast("Password Update successfull");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setToast("Wrong otp");
        setTimeout(() => {
          setToast("");
        }, 1500);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative">
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md z-50 text-sm animate-fade-in-down">
          {toast}
        </div>
      )}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Reset Password
        </h2>
        <form
          onSubmit={(e) => forgetPasswordHandler(e)}
          className="flex flex-col gap-4"
        >
          <label htmlFor="email" className="text-sm text-gray-700">
            Enter the email you registered with:
          </label>
          <input
            id="email"
            ref={email}
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {otp && (
            <input
              ref={otpref}
              type="text"
              placeholder="Enter OTP"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          {otp && (
            <input
              ref={password}
              type="password"
              placeholder="Enter new password"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {otp ? "Reset" : "Get OTP"}
          </button>
        </form>

        <button
          type="button"
          className="mt-4 w-full text-blue-500 text-sm hover:underline"
        >
          <NavLink to="/login">Already a user? Login</NavLink>
        </button>
      </div>
    </div>
  );
}
