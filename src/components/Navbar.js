import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // 👈 make sure you have this

const Navbar = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth(); // 👈 example values from context
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search.trim())}`);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout(); // 👈 log the user out
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        ShopEase
      </Link>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center w-1/2 max-w-lg"
      >
        <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white w-full">
          <span className="px-3 text-gray-500">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2 px-2 focus:outline-none"
          />
        </div>
      </form>

      {/* Right Side: Cart + User */}
      <div className="flex items-center space-x-4 relative">
        {/* Cart */}
        <Link
          to="/cart"
          className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
        >
          <FaShoppingCart />
          <span className="ml-1 font-semibold">({cart.length})</span>
          Cart
        </Link>

        {/* If user is NOT logged in */}
        {!isAuthenticated ? (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-1"
          >
            Login
          </Link>
        ) : (
          // If user IS logged in - show dropdown
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
                  Profile
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
