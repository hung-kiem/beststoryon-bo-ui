import { forwardRef } from "react";

interface InputProps {
  label: string;
  layout?: "vertical" | "horizontal";
  placeholder?: string;
  className?: string;
  type?: "text" | "number" | "email" | "tel" | "password";
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      layout = "vertical",
      placeholder = "Nhập thông tin",
      className = "",
      type = "text",
      defaultValue = "",
      onChange = () => {},
    },
    ref
  ) => {
    const inputId = `${label}-input`;
    const labelClasses =
      "block text-sm font-medium text-black dark:text-white mb-3";
    const inputClasses =
      "h-[42px] w-80 rounded-lg border-[1.5px] border-stroke bg-transparent px-2 text-sm text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary";

    return (
      <div
        className={`h-fit ${
          layout === "vertical"
            ? "grid grid-cols-1"
            : "grid grid-cols-12 items-center gap-2"
        }`}
      >
        {label && (
          <label
            className={`${
              layout === "horizontal" ? "col-span-4" : ""
            } ${labelClasses}`}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          name={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`${
            layout === "horizontal" ? "col-span-8" : ""
          } ${inputClasses} ${className}`}
          onChange={onChange}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
