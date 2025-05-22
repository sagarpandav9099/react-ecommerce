import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CartLink from "./CartLink";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between relative">
      <Logo />
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <div className="flex items-center space-x-4 relative">
        <CartLink cartCount={cart.length} />
        <UserMenu
          isAuthenticated={isAuthenticated}
          user={user}
          dropdownOpen={dropdownOpen}
          toggleDropdown={() => setDropdownOpen(!dropdownOpen)}
          setDropdownOpen={setDropdownOpen}
          handleLogout={logout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
