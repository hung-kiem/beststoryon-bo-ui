"use client";
import React, { createRef, useCallback, useEffect, useState } from "react";

interface SelectGroupProps {
  items: Array<{ label: string | number; value: string | number }>;
  label: string;
  disabled?: boolean;
  name?: string;
  control?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SelectSingle({
  items,
  label,
  disabled,
  name,
  value,
  control,
  onChange,
}: SelectGroupProps) {
  const [selectedOption, setSelectedOption] = useState<string>(value || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = createRef<HTMLDivElement>();

  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setIsDropdownOpen(false);
    if (onChange) onChange(value); // Gọi hàm onChange từ bên ngoài nếu có
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    // Cập nhật selectedOption khi prop value thay đổi từ bên ngoài
    if (value !== undefined) {
      setSelectedOption(value);
    }
  }, [value]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>

      <div
        className={`relative z-20 flex h-[42px] w-full cursor-pointer items-center rounded-lg border border-stroke bg-transparent px-2 text-sm outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={toggleDropdown}
      >
        <div
          className={`text-[#9ca4b1] dark:text-white ${
            selectedOption ? "text-black dark:text-white" : ""
          }`}
        >
          {selectedOption
            ? items.find((item) => item.value === selectedOption)?.label
            : `Chọn ${label.toLowerCase()}`}
        </div>
        <span className="absolute right-1 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>

      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-30 mt-1 w-full rounded-md bg-white text-sm shadow dark:bg-form-input">
          {items.map((item) => (
            <div
              key={item.value}
              onClick={() => handleOptionSelect(item.value as string)}
              className={`dark:hover:bg-gray-700 cursor-pointer px-4 py-2 hover:bg-primary/5 ${
                selectedOption === item.value
                  ? "dark:bg-gray-600 bg-primary/10"
                  : ""
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
