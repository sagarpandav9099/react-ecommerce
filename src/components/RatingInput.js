import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingInput = ({ productId, onRate }) => {
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleRating = (rating) => {
    setSelected(rating);
    onRate(rating);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`cursor-pointer ${
            (hover || selected) >= star ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        />
      ))}
      
    </div>
  );
};

export default RatingInput;
