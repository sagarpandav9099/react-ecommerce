import React from "react";
import { getDiscountedPrice, formatCurrency } from "../utils/priceUtils";
import { DEFAULT_DISCOUNT_PERCENT } from "../config/discountConfig";

const PriceWithDiscount = ({
  price,
  currency,
  discountPercent = DEFAULT_DISCOUNT_PERCENT,
}) => {
  const discountedPrice = getDiscountedPrice(price, discountPercent);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500 line-through">
        {formatCurrency(price, currency)}
      </span>

      <span className="text-xs text-red-500 font-semibold">
        {discountPercent}% OFF
      </span>

      <span className="text-green-600 font-bold text-md">
        {formatCurrency(discountedPrice, currency)}
      </span>
    </div>
  );
};

export default PriceWithDiscount;
