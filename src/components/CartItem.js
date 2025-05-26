import useCountryCurrency from "../context/CountryCurrency";
import { getDiscountedPrice, formatCurrency } from "../utils/priceUtils";

export default function CartItem({
  item,
  increaseQty,
  decreaseQty,
  removeFromCart,
}) {
  const { currency } = useCountryCurrency();
  const actualPrice = item.price;
  const discountedPrice = getDiscountedPrice(actualPrice, 2);
  return (
    <div className="flex items-center justify-between bg-white shadow rounded-lg p-4">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 object-contain rounded"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-700">
            Price:{" "}
            <span className="text-sm text-gray-500  line-through">
              {formatCurrency(actualPrice, currency)}
            </span>
            {/* Discounted Price */}
            <span className="text-green-600 ps-3 font-bold text-md">
              {formatCurrency(discountedPrice, currency)}
            </span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            Quantity:
            <button
              onClick={() => decreaseQty(item.id)}
              disabled={item.quantity <= 1}
              className={`px-2 py-1 border rounded ${
                item.quantity <= 1
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              -
            </button>
            <span className="px-2">{item.quantity}</span>
            <button
              onClick={() => increaseQty(item.id)}
              disabled={item.quantity >= 10}
              className={`px-2 py-1 border rounded ${
                item.quantity >= 10
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              +
            </button>
          </p>
          <p className="text-black font-semibold">
            Subtotal: {formatCurrency(discountedPrice * item.quantity)}
          </p>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-600 hover:underline font-medium"
      >
        Remove
      </button>
    </div>
  );
}
