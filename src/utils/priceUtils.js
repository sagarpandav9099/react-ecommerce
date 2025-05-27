import { DEFAULT_DISCOUNT_PERCENT } from "../config/discountConfig";

export const getDiscountedPrice = (
  price,
  discountPercent = DEFAULT_DISCOUNT_PERCENT
) => {
  const discountAmount = (price * discountPercent) / 100;
  return price - discountAmount;
};

export const formatCurrency = (amount, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(currency === "INR" ? amount * 80 : amount);
};
