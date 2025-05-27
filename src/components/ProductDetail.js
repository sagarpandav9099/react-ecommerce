import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useCountryCurrency from "../context/CountryCurrency";
import { getDiscountedPrice, formatCurrency } from "../utils/priceUtils";
import PriceWithDiscount from "../components/PriceWithDiscount";
import { FaStar } from "react-icons/fa";
import RatingInput from "../components/RatingInput";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart } = useCart();
  const [userRating, setUserRating] = useState(null);

  const { currency } = useCountryCurrency();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating-${id}`);
    if (savedRating) setUserRating(parseInt(savedRating));
  }, [id]);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  if (!product) return <div className="p-4 text-center">Loading...</div>;

  const actualPrice = product.price;
  const discountedPrice = getDiscountedPrice(actualPrice, 2);
  const isInCart = cart.find((item) => item.id === product.id);

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-sm h-auto object-contain"
        />
      </div>

      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 text-sm mb-4">{product.description}</p>
          <div className="flex justify-between items-center gap-4 mb-5">
            <div className="flex items-center text-yellow-400 text-sm font-medium space-x-2">
                <span>
                {(
                    (product.rating.rate * product.rating.count + (userRating || 0)) /
                    (product.rating.count + (userRating ? 1 : 0))
                ).toFixed(1)}
                </span>
                <FaStar />
                <span className="text-blue-400 text-xs">
                ({product.rating.count + (userRating ? 1 : 0)}{" "}
                 reviews)
                </span>
            </div>
            {userRating && (
                <span className="text-green-600 text-xs ml-2">
                    ✅ You rated this {userRating} ⭐
                </span>
                )}
            
            {!userRating && (
                <div className="flex items-center text-sm text-gray-700 space-x-2">
                <span>Add rating:</span>
                <RatingInput
                    productId={product.id}
                    onRate={(rating) => {
                    setUserRating(rating);
                    localStorage.setItem(`rating-${product.id}`, rating);
                    }}
                />
                </div>
                )}
            </div>


          {/* Price & Quantity */}
          <div className="space-y-3 mb-6">
            {/* Unit Price */}
            <div className="flex justify-between items-center text-base md:text-lg">
              <PriceWithDiscount price={product.price} currency={currency} />
              <div className="flex items-center gap-2">
                <button
                  onClick={decrease}
                  disabled={quantity <= 1}
                  className={`px-3 py-1 border rounded-md text-lg font-semibold ${
                    quantity <= 1
                      ? "bg-gray-300 cursor-not-allowed text-gray-500"
                      : "bg-gray-100 hover:bg-gray-200 text-black"
                  }`}
                >
                  -
                </button>
                <span className="font-semibold text-xl px-2">{quantity}</span>
                <button
                  onClick={increase}
                  disabled={quantity >= 10}
                  className={`px-3 py-1 border rounded-md text-lg font-semibold ${
                    quantity >= 10
                      ? "bg-gray-300 cursor-not-allowed text-gray-500"
                      : "bg-gray-100 hover:bg-gray-200 text-black"
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex justify-between items-center border-t pt-3 text-base md:text-lg">
              <span className="font-bold text-gray-800">Total Price:</span>
              <span className="text-2xl font-bold text-green-600">
                {formatCurrency(discountedPrice * quantity, currency)}
              </span>
            </div>
          </div>
        </div>

        <button
          className={`w-full py-2 px-4 text-lg font-semibold rounded transition duration-200 shadow ${
            isInCart
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 text-black"
          }`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "✅ Already in Cart" : "🛒 Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
