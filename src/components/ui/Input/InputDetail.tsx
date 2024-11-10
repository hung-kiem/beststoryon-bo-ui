"use client";
import React from "react";

type InputDetailProps = {
  label: string;
  value: React.ReactNode;
  color?: "red" | "blue" | "normal";
  isBold?: boolean;
};

const InputDetail: React.FC<InputDetailProps> = ({
  label,
  value,
  color = "normal",
  isBold = true,
}) => {
  let valueClassName = "text-black dark:text-white";
  if (color === "red") {
    valueClassName = "text-red-600 dark:text-red-400";
  } else if (color === "blue") {
    valueClassName = "text-blue-600 dark:text-blue-400";
  }

  const finalValueClassName = isBold
    ? `${valueClassName} font-semibold`
    : valueClassName;

  return (
    <div className="flex items-center gap-4">
      <label className="basis-1/3 text-sm text-neutral-600 dark:text-white whitespace-nowrap">
        {label}:
      </label>
      <div className={`basis-2/3 text-sm ${finalValueClassName}`}>
        {value || "-"}
      </div>
    </div>
  );
};

export default InputDetail;
