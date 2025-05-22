import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders.reverse()); // show latest first
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 border-b pb-2">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow bg-white"
            >
              <div className="mb-2 text-gray-600 text-sm">
                <span className="font-medium">Order Date:</span> {order.date}
              </div>
              <div className="mb-2">
                <span className="font-medium">Name:</span> {order.name}
              </div>
              <div className="mb-2">
                <span className="font-medium">Address:</span> {order.address}
              </div>
              <div className="mb-2">
                <span className="font-medium">Card:</span> **** **** ****{" "}
                {order.cardNumber}
              </div>
              <div className="mb-2 font-semibold">Items:</div>
              <ul className="space-y-1 mb-2">
                {order.cart.map((item) => (
                  <li key={item.id} className="text-sm">
                    {item.title} × {item.quantity} – ${item.price} each
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold text-lg">
                Total: ${order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
