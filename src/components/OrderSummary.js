export default function OrderSummary({
  cart,
  totalQuantity,
  totalBeforeDiscount,
  discount,
  totalAfterDiscount,
  onCheckoutClick,
}) {
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
        <span>${totalBeforeDiscount.toFixed(2)}</span>
      </div>
      {discount > 0 ? (
        <>
          <div className="flex justify-between text-green-600 font-medium mb-2">
            <span>Discount (10%):</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-6 border-t pt-2">
            <span>Final Total:</span>
            <span>${totalAfterDiscount.toFixed(2)}</span>
          </div>
        </>
      ) : (
        <div className="flex justify-between text-lg font-bold mb-6 border-t pt-2">
          <span>Final Total:</span>
          <span>${totalBeforeDiscount.toFixed(2)}</span>
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
