import React from "react";

const GradientIcons = ({ colors }) => {
  return (
    <svg width="0" height="0">
      <defs>
        <linearGradient id="gradientCustom" x1="0%" y1="0%" x2="100%" y2="100%">
          {colors.map((color, index) => (
            <stop
              key={index}
              offset={`${(index / (colors.length - 1)) * 100}%`}
              style={{ stopColor: color, stopOpacity: 1 }}
            />
          ))}
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GradientIcons;
