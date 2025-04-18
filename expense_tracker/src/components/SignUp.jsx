import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [toast, setToast] = useState("");
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const otpref = useRef();
  const navigate = useNavigate();

  function signUpHandler(e) {
    e.preventDefault();
    const emaill = email.current.value;
    const passwordd = password.current.value;
    const confirmPasswordd = confirmPassword.current.value;

    const isValid = validator(emaill, passwordd, confirmPasswordd);
    if (!isValid) {
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    if (!isOtpSent) {
      sendOtp(emaill);
    } else {
      sendData(emaill, passwordd,otpref.current.value);
    }
  }

  async function sendData(emaill, passwordd,ottp) {
    const payload = {
      email: emaill,
      password: passwordd,
    };
    try {
      const request = await fetch(`http://localhost:8888/user?otp=${ottp}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!request.ok) {
        throw new Error("something went wrong");
      }
      const response = await request.json();
      setToast("Sign up successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setToast("Something went wrong. Please try again.");
      setTimeout(() => setToast(""), 2000);
    }
  }

  async function sendOtp(emailAdr) {
    try {
      const request = await fetch(`http://localhost:8888/send/${emailAdr}`);
      if (!request.ok) {
        throw new Error("Otp send Fails please try after some time");
      }
      setIsOtpSent(true);
      setToast("OTP sent successfully!");
      setTimeout(() => setToast(""), 2000);
    } catch (err) {
      setToast("OTP sending failed. Try again.");
      setTimeout(() => setToast(""), 2000);
    }
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
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h1>

        {toast && (
          <div className="mb-4 text-center p-2 bg-green-100 text-green-800 rounded-xl text-sm shadow">
            {toast}
          </div>
        )}

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
          {isOtpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              ref={otpref}
              className="p-3 border border-blue-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-blue-50 font-semibold tracking-widest text-center text-lg"
            />
          )}

          {error && (
            <p className="bg-red-100 text-red-600 border border-red-300 px-4 py-2 rounded-xl text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            {isOtpSent ? "Sign Up" : "Get OTP"}
          </button>
        </form>
        <button className="mt-4 text-blue-500 hover:underline w-full text-center">
          <Link to="/login">Have an account? Login</Link>
        </button>
      </div>
    </div>
  );
}
