import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const totalBeforeDiscount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Apply 10% discount if total > 1000
  const discount = totalBeforeDiscount > 1000 ? totalBeforeDiscount * 0.1 : 0;
  const totalAfterDiscount = totalBeforeDiscount - discount;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 border-b pb-2">
        🛒 Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-16 border rounded-md shadow-sm">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-700">Price: ${item.price}</p>
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
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
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
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 shadow rounded-lg h-fit">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">
              Order Summary
            </h3>
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
            {discount > 0 && (
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
            )}
            {discount === 0 && (
              <div className="flex justify-between text-lg font-bold mb-6 border-t pt-2">
                <span>Final Total:</span>
                <span>${totalBeforeDiscount.toFixed(2)}</span>
              </div>
            )}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
