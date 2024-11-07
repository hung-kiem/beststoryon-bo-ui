"use client";
import React from "react";

type InputDetailProps = {
  label: string;
  value: React.ReactNode;
  color?: "red" | "blue" | "normal";
};

const InputDetail: React.FC<InputDetailProps> = ({
  label,
  value,
  color = "normal",
}) => {
  let valueClassName = "text-black dark:text-white";
  if (color === "red") {
    valueClassName = "text-red-600 dark:text-red-400";
  } else if (color === "blue") {
    valueClassName = "text-blue-600 dark:text-blue-400";
  }

  return (
    <div className="flex items-center gap-4">
      {/* Thêm lớp whitespace-nowrap để ngăn nhãn xuống dòng */}
      <label className="basis-1/3 text-sm text-neutral-600 dark:text-white whitespace-nowrap">
        {label}:
      </label>
      <div className={`basis-2/3 text-sm font-semibold ${valueClassName}`}>
        {value || "-"}
      </div>
    </div>
  );
};

export default InputDetail;
