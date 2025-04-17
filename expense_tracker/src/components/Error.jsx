import { useRouteError } from "react-router-dom";

export function Error() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-2">Something went wrong.</p>
      {error?.status && (
        <p className="text-gray-500 mb-4">
          <strong>{error.status}</strong> — {error.statusText || error.message}
        </p>
      )}
      <a
        href="/"
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition duration-300"
      >
        Go Home
      </a>
    </div>
  );
}
