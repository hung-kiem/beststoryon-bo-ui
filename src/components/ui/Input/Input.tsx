import { forwardRef } from "react";
import classNames from "classnames";

interface InputProps {
  label: string;
  layout?: "vertical" | "horizontal";
  placeholder?: string;
  className?: string;
  type?: "text" | "number" | "email" | "tel";
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      layout = "vertical",
      placeholder = "Nhập thông tin",
      className = "",
      type = "text",
      value,
      onChange,
      isReadOnly = false,
      ...rest
    },
    ref
  ) => {
    const id = Math.floor(10000 + Math.random() * 90000);
    const inputId = `${id}-input`;
    const labelClasses = classNames(
      "block text-sm font-medium text-black dark:text-white mb-3",
      layout === "horizontal" ? "col-span-4" : ""
    );

    const inputClasses = classNames(
      "h-[42px] w-80 rounded-lg border-[1.5px] border-stroke bg-transparent px-2 text-sm text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
      layout === "horizontal" ? "col-span-8" : "",
      className
    );

    return (
      <div
        className={classNames(
          "h-fit",
          layout === "vertical"
            ? "grid grid-cols-1"
            : "grid grid-cols-12 items-center gap-2"
        )}
      >
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          name={label}
          placeholder={placeholder}
          value={value}
          className={inputClasses}
          onChange={!isReadOnly ? onChange : undefined}
          readOnly={isReadOnly}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
