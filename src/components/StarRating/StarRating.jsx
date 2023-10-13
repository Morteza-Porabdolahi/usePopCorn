import { useState } from "react";
import { Star } from "./Star";

const starContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

export function StarRating({
  className = '', maxRating = 5, color = '#fcc419', textSize = 48, iconSize = 48, defaultRating = 0, onSetRating = () => { }
}) {
  const [rating, setRating] = useState(
    defaultRating > maxRating ? 0 : defaultRating
  );
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    fontSize: textSize,
    color,
  };

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? i <= tempRating - 1 : i <= rating - 1}
            onClick={() => handleRating(i + 1)}
            onMouseEnter={() => setTempRating(i + 1)}
            color={color}
            iconSize={iconSize}
            onMouseLeave={() => setTempRating(0)} />
        ))}
      </div>
      <p style={textStyle}>
        {tempRating ? tempRating : rating !== 0 && rating}
      </p>
    </div>
  );
}
