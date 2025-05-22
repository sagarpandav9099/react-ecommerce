import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaChevronDown } from "react-icons/fa";

const UserMenu = ({
  isAuthenticated,
  user,
  dropdownOpen,
  toggleDropdown,
  setDropdownOpen,
  handleLogout,
}) => {
  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-1"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        <FaUser />
        <span>{user.username}</span>
        <FaChevronDown className="text-xs" />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
          <Link
            to="/profile"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile Update
          </Link>
          <Link
            to="/profile/view"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile View
          </Link>
          <Link
            to="/my-orders"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Orders
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
