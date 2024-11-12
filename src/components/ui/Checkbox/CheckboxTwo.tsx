import React, { useState } from "react";
import IconChecked from "../icons/IconChecked";

interface CheckboxTwoProps {
  label?: string; // Không bắt buộc
  isChecked?: boolean; // Trạng thái ban đầu, không bắt buộc
  isDisabled?: boolean; // Không bắt buộc
  onCheck?: (checked: boolean) => void; // Không bắt buộc
}

const CheckboxTwo: React.FC<CheckboxTwoProps> = ({
  label = "",
  isChecked = false, // Giá trị mặc định là false
  isDisabled = false, // Giá trị mặc định là false
  onCheck,
}) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  const handleCheck = () => {
    if (isDisabled) return; // Không làm gì nếu bị vô hiệu hóa
    const newChecked = !checked;
    setChecked(newChecked);
    if (onCheck) {
      onCheck(newChecked);
    }
  };

  return (
    <div>
      <label
        htmlFor="checkboxLabelTwo"
        className={`flex cursor-pointer select-none items-center ${
          isDisabled ? "cursor-not-allowed opacity-50" : ""
        }`} // Thêm lớp để chỉ trạng thái vô hiệu hóa
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelTwo"
            className="sr-only"
            checked={checked}
            onChange={handleCheck}
            disabled={isDisabled} // Thêm thuộc tính disabled
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              checked
                ? "border-primary bg-gray dark:bg-transparent"
                : "border-gray-300"
            } ${isDisabled ? "cursor-not-allowed" : ""}`} // Thêm lớp nếu bị vô hiệu hóa
          >
            <span className={`opacity-0 ${checked ? "!opacity-100" : ""}`}>
              <IconChecked />
            </span>
          </div>
        </div>
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

export default CheckboxTwo;
