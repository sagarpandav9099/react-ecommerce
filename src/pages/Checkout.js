import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div>
      <h2 className="m-2 text-2xl font-bold tracking-tight">Checkout</h2>
      <hr></hr>
      <p className="inline-flex font-medium p-2 items-center text-blue-600 hover:underline">Total: ${total}</p>
      <button className=" mt-5 px-3 py-2 text-sm font-medium  text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 ms-10 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => alert("Thank you for your purchase!")}>Place Order</button>
    </div>
  );
}
