"use client";

import classNames from "classnames";

interface InputProps {
  label: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  name?: string;
  value?: string;
  disabled?: boolean;
}

export default function Input({
  label,
  placeholder = "Nhập thông tin",
  value,
  onChange,
  disabled,
  name,
}: InputProps) {
  return (
    <div className={"grid h-fit grid-cols-1 gap-1"}>
      {label && (
        <label
          className={"block text-sm font-medium text-black dark:text-white"}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={classNames(
          "h-[42px] w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2",
          "text-sm text-black outline-none transition focus:border-primary active:border-primary",
          "disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
        )}
        name={name}
        defaultValue={value}
        autoCorrect={"off"}
        autoComplete={"off"}
        autoCapitalize={"off"}
        onChange={(e) => onChange?.(e.currentTarget.value)}
      />
    </div>
  );
}
