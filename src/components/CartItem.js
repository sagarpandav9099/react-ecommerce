import useCountryCurrency from "../context/CountryCurrency";
import { getDiscountedPrice, formatCurrency } from "../utils/priceUtils";
import PriceWithDiscount from "./PriceWithDiscount";

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
            Price: <PriceWithDiscount price={item.price} currency={currency} />
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
            Subtotal:{" "}
            {formatCurrency(discountedPrice * item.quantity, currency)}
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
