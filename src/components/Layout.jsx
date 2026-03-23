import { Link } from "react-router-dom";
import { auth } from "../firebase";

export default function Layout({ children }) {
  const user = auth.currentUser;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">
          InterviewHub
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
            </>
          ) : (
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-3xl mx-auto p-4">
        {children}
      </div>
    </div>
  );
}