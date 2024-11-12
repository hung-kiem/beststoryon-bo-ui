import React, { useState } from "react";

interface CheckboxThreeProps {
  label?: string; // Không bắt buộc
  isChecked: boolean;
  isDisabled?: boolean; // Không bắt buộc
  onCheck?: (checked: boolean) => void; // Không bắt buộc
}

const CheckboxThree: React.FC<CheckboxThreeProps> = ({
  label = "", // Giá trị mặc định là một chuỗi rỗng
  isChecked: initialChecked,
  isDisabled = false, // Giá trị mặc định là false
  onCheck,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

  const handleCheck = () => {
    if (isDisabled || !onCheck) return; // Không thực hiện nếu bị vô hiệu hóa hoặc không có hàm onCheck
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onCheck(newChecked);
  };

  return (
    <div>
      <label
        htmlFor={`checkbox-${label}`}
        className={`flex cursor-pointer select-none items-center ${
          isDisabled ? "cursor-not-allowed opacity-50" : ""
        }`} // Thêm lớp để chỉ trạng thái vô hiệu hóa
      >
        <div className="relative">
          <input
            type="checkbox"
            id={`checkbox-${label}`}
            className="sr-only"
            checked={isChecked}
            onChange={handleCheck}
            disabled={isDisabled} // Thêm thuộc tính disabled
          />
          <div
            className={`box mr-4 flex h-5 w-5 items-center justify-center rounded border transition ${
              isChecked
                ? "border-primary bg-gray dark:bg-transparent"
                : "border-gray-300"
            } ${isDisabled ? "cursor-not-allowed" : ""}`} // Thêm lớp nếu bị vô hiệu hóa
          >
            <span
              className={`text-primary transition-opacity duration-200 ${
                isChecked ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg
                className="h-3.5 w-3.5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </div>
        </div>
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

export default CheckboxThree;
