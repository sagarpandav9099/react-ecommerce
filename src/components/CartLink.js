import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CartLink = ({ cartCount }) => (
  <Link
    to="/cart"
    className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
  >
    <FaShoppingCart />
    <span className="ml-1 font-semibold">({cartCount})</span>
    Cart
  </Link>
);

export default CartLink;
