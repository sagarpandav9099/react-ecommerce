import { useCart } from "../context/CartContext";
import { useState } from "react";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import CheckoutForm from "../components/CheckoutForm";
import EmptyCartMessage from "../components/EmptyCartMessage";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getDiscountedPrice } from "../utils/priceUtils";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  // 1. Apply 2% discount to each item
  const cartWith2PercentDiscount = cart.map((item) => {
    const discountedPrice = getDiscountedPrice(item.price); // 2% by default
    return {
      ...item,
      discountedPrice,
      subtotal: discountedPrice * item.quantity,
    };
  });

  // 2. Calculate total before extra discount
  const totalBeforeExtraDiscount = cartWith2PercentDiscount.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  // 3. Apply 10% extra discount if total > 100000
  const extraDiscount =
    totalBeforeExtraDiscount > 100000 ? totalBeforeExtraDiscount * 0.1 : 0;

  const totalAfterDiscount = totalBeforeExtraDiscount - extraDiscount;

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    address: "",
    cardNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (
      !checkoutData.name ||
      !checkoutData.address ||
      !checkoutData.cardNumber
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const order = {
      id: Date.now(),
      user: user.username,
      name: checkoutData.name,
      address: checkoutData.address,
      cardNumber: checkoutData.cardNumber.slice(-4),
      cart,
      total: totalAfterDiscount.toFixed(2),
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    localStorage.removeItem("cart");
    clearCart();
    alert("Thank you for your order!");
    navigate("/my-orders");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 border-b pb-2">
        🛒 Your Shopping Cart
      </h2>
      {cart.length === 0 ? (
        <EmptyCartMessage />
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
          <div>
            <OrderSummary
              cart={cartWith2PercentDiscount}
              totalQuantity={totalQuantity}
              totalBeforeDiscount={totalBeforeExtraDiscount}
              discount={extraDiscount}
              totalAfterDiscount={totalAfterDiscount}
              onCheckoutClick={() => setShowCheckoutForm(true)}
            />
            {showCheckoutForm && (
              <CheckoutForm
                checkoutData={checkoutData}
                handleInputChange={handleInputChange}
                handleOrderSubmit={handleOrderSubmit}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
