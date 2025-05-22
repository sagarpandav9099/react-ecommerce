export default function CheckoutForm({
  checkoutData,
  handleInputChange,
  handleOrderSubmit,
}) {
  return (
    <form
      onSubmit={handleOrderSubmit}
      className="mt-4 bg-white border p-4 rounded-lg space-y-4"
    >
      <div>
        <label className="block font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={checkoutData.name}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Address</label>
        <textarea
          name="address"
          value={checkoutData.address}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={checkoutData.cardNumber}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-lg"
      >
        Submit Order
      </button>
    </form>
  );
}
