import useCountryCurrency from "../context/CountryCurrency";
import { formatCurrency } from "../utils/priceUtils";

export default function OrderSummary({
  cart,
  totalQuantity,
  totalBeforeDiscount,
  discount,
  totalAfterDiscount,
  onCheckoutClick,
}) {
  const { currency } = useCountryCurrency();

  return (
    <div className="bg-gray-50 p-6 shadow rounded-lg h-fit">
      <h3 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h3>
      <div className="flex justify-between text-lg font-medium mb-2">
        <span>Total Items:</span>
        <span>{cart.length}</span>
      </div>
      <div className="flex justify-between text-lg font-medium mb-2">
        <span>Quantity:</span>
        <span>{totalQuantity}</span>
      </div>
      <div className="flex justify-between text-lg font-medium mb-2">
        <span>Total:</span>
        <span> {formatCurrency(totalBeforeDiscount, currency)} </span>
      </div>
      {discount > 0 ? (
        <>
          <div className="flex justify-between text-green-600 font-medium mb-2">
            <span>Discount (10% on orders over ₹1,00,000):</span>
            <span>- {formatCurrency(discount, currency)} </span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-6 border-t pt-2">
            <span>Final Total:</span>
            <span>{formatCurrency(totalAfterDiscount, currency)} </span>
          </div>
        </>
      ) : (
        <div className="flex justify-between text-lg font-bold mb-6 border-t pt-2">
          <span>Final Total:</span>
          <span>{formatCurrency(totalAfterDiscount, currency)} </span>
        </div>
      )}
      <button
        onClick={onCheckoutClick}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
