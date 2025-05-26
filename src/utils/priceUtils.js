export const getDiscountedPrice = (price, discountPercent = 2) => {
  const discountAmount = (price * discountPercent) / 100;
  return price - discountAmount;
};

export const formatCurrency = (amount, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(currency === "INR" ? amount * 80 : amount);
};
