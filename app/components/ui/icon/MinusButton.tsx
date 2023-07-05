import React from "react";

type Props = {
  strokeColor: string;
  className: string;
};
const MinusButton = ({ strokeColor, className }: Props) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_146_3835)">
        <rect
          x="10"
          y="16.75"
          width="1.5"
          height="12"
          transform="rotate(-90 10 16.75)"
          fill={strokeColor}
        />
      </g>
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="15"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <defs>
        <clipPath id="clip0_146_3835">
          <rect
            width="16"
            height="16"
            fill={strokeColor}
            transform="translate(8 8)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MinusButton;
