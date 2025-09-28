import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center">
    <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
    <p className="text-xl mb-6">Oops! Page not found.</p>
    <Link
      to="/"
      className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      Go to Home
    </Link>
  </div>
);

export default PageNotFound;
