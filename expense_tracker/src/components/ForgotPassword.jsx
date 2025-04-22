import { useRef, useState } from "react";

export function ForgotPassword() {
  const email = useRef();
  const password = useRef();
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Reset Password</h2>
        <form className="flex flex-col gap-4">
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
          Already a user? Login
        </button>
      </div>
    </div>
  );
}
