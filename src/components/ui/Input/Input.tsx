import { forwardRef } from "react";
import classNames from "classnames";

interface InputProps {
  label: string;
  layout?: "vertical" | "horizontal";
  placeholder?: string;
  className?: string;
  type?: "text" | "number" | "email" | "tel";
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
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
      readonly = false,
      ...rest
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
        className={classNames(
          "h-fit",
          layout === "vertical"
            ? "grid grid-cols-1"
            : "grid grid-cols-12 items-center gap-2"
        )}
      >
        {label && (
          <label
            htmlFor={inputId}
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
          value={value}
          className={classNames(
            layout === "horizontal" ? "col-span-8" : "",
            inputClasses,
            className
          )}
          onChange={onChange}
          readOnly={readonly}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
