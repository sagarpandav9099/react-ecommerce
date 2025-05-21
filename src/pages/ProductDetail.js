import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity); // pass quantity
    navigate("/cart"); // redirect
  };

  if (!product) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-sm h-auto object-contain"
        />
      </div>

      <div className="flex flex-col justify-between space-y-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 text-sm mb-4">{product.description}</p>

          {/* Price & Quantity */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-green-600">
              ${product.price}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Qty:</span>
              <button
                onClick={decrease}
                className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-semibold text-lg">{quantity}</span>
              <button
                onClick={increase}
                className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded w-full transition duration-200 shadow"
          onClick={handleAddToCart}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
