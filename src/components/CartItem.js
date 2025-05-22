export default function CartItem({
  item,
  increaseQty,
  decreaseQty,
  removeFromCart,
}) {
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
  );
}
