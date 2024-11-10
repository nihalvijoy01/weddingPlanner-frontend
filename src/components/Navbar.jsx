import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("username"); // Remove username when logging out
      navigate("/");
    }
  };

  // Check if the user is logged in by looking for the access token in localStorage
  const isLoggedIn = !!localStorage.getItem("access_token");
  const username = localStorage.getItem("username"); // Retrieve username from localStorage

  return (
    <nav className=" bg-gray-900   ">
      <div className="flex justify-between items-center h-16 px-4">
        <div className=" space-x-4 items-center">
          <Link
            to="/"
            className="rounded-md bg-gray-900 px-3 py-2 text-lg font-medium text-white"
          >
            WeddinPlanner
          </Link>

          {isLoggedIn ? (
            // If the user is logged in, show the rest of the links
            <>
              <Link
                to="/weddings"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Weddings
              </Link>

              {/* <Link
                to="/jokes"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Jokes
              </Link> */}
              <button
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            // If the user is not logged in, show only the Login and Signup links
            <>
              <Link
                to="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {isLoggedIn && username && (
          // Display the username and profile icon on the right side if the user is logged in
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-300">
              {username}
            </span>
            <FaUserCircle className="text-white size-7" />
          </div>
        )}
      </div>
    </nav>
  );
}
