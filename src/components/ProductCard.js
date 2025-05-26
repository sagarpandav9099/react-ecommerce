import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEye, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import useCountryCurrency from "../context/CountryCurrency";
import { getDiscountedPrice, formatCurrency } from "../utils/priceUtils";

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { currency } = useCountryCurrency();

  const isInCart = cart.find((item) => item.id === product.id);

  const handleAddAndGoToCart = () => {
    isAuthenticated ? addToCart(product, 1) : navigate("/login");
    navigate("/cart");
  };

  const actualPrice = product.price;
  const discountedPrice = getDiscountedPrice(actualPrice, 2);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300 flex flex-col">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          NEW
        </span>
        {isInCart && (
          <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Qty: {isInCart.quantity}
          </span>
        )}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/product/${product.id}`}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
            title="View"
          >
            <FaEye className="text-gray-700" />
          </Link>
          <button
            onClick={handleAddAndGoToCart}
            disabled={isInCart}
            className={`bg-white p-2 rounded-full shadow hover:bg-gray-100 transition ${
              isInCart ? "cursor-not-allowed opacity-50" : ""
            }`}
            title={isInCart ? "Already in cart" : "Add to Cart"}
          >
            <FaShoppingCart className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-gray-700 text-sm font-semibold line-clamp-2 mb-2">
          {product.title}
        </h3>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            {/* Original Price */}
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(actualPrice, currency)}
            </span>
            {/* Discounted Price */}
            <span className="text-green-600 font-bold text-md">
              {formatCurrency(discountedPrice, currency)}
            </span>
          </div>

          {/* Rating */}
          <div className="flex text-yellow-400 text-xs space-x-1">
            {[...Array(Math.round(product.rating?.rate || 4))].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
