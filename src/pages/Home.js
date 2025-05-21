import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { FaShoppingCart, FaEye, FaStar } from "react-icons/fa"; // Icons
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);
  const handleAddAndGoToCart = (product) => {
    addToCart(product, 1); // Add to cart
    navigate("/cart"); // Redirect to cart page
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Banner />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
                />

                {/* NEW Badge */}
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  NEW
                </span>

                {/* Overlay Buttons */}
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* View icon links to product page */}
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    title="View"
                  >
                    <FaEye className="text-gray-700" />
                  </Link>

                  {/* Cart icon triggers addToCart */}
                  <button
                    onClick={() => handleAddAndGoToCart(product)}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    title="Add to Cart"
                  >
                    <FaShoppingCart className="text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Product Title - full width */}
                <h3 className="text-gray-700 text-sm font-semibold line-clamp-2 mb-2">
                  {product.title}
                </h3>

                {/* Price and Rating - side by side */}
                <div className="flex justify-between items-center">
                  <p className="text-green-600 font-bold">${product.price}</p>
                  <div className="flex text-yellow-400 text-xs space-x-1">
                    {[...Array(Math.round(product.rating?.rate || 4))].map(
                      (_, i) => (
                        <FaStar key={i} />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No products found.
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
