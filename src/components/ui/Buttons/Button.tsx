"use client";

import Link from "next/link";
import { FC, ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps {
  type?:
    | "primary"
    | "secondary"
    | "black"
    | "outline"
    | "outline-secondary"
    | "outline-black";
  size?: "small" | "medium" | "large";
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean; // Thêm biến isLoading
  htmlType?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  type = "black",
  size = "small",
  icon,
  href,
  onClick,
  children,
  className,
  isDisabled = false,
  isLoading = false, // Giá trị mặc định là false
  htmlType = "button",
}) => {
  const buttonClasses = classNames(
    className,
    "inline-flex items-center justify-center whitespace-nowrap border text-center font-medium transition hover:bg-opacity-90",
    {
      "border-primary bg-primary text-white": type === "primary",
      "border-primary text-primary hover:bg-primary hover:text-white":
        type === "outline",
      "border-secondary bg-secondary text-white": type === "secondary",
      "border-secondary text-secondary hover:bg-secondary hover:text-white":
        type === "outline-secondary",
      "border-black bg-black text-white hover:bg-[rgb(46,50,54)] dark:border-white dark:hover:bg-[rgb(21,22,23)]":
        !type || type === "black",
      "border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white":
        type === "outline-black",

      "h-[36px] px-4 text-sm": size === "small",
      "text-md h-[42px] px-6": size === "medium",
      "h-[56px] px-8 text-lg": !size || size === "large",

      "rounded-full": size === "large",
      "rounded-lg": size !== "large",

      "opacity-50 cursor-not-allowed": isDisabled || isLoading, // Thêm isLoading để disable khi loading
    }
  );

  const LoadingIcon = (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  );

  if (href) {
    return (
      <Link href={isDisabled || isLoading ? "#" : href} passHref legacyBehavior>
        <a
          className={buttonClasses}
          onClick={isDisabled || isLoading ? undefined : onClick}
          aria-disabled={isDisabled || isLoading}
          tabIndex={isDisabled || isLoading ? -1 : undefined}
        >
          {isLoading ? (
            <span className="mr-2">{LoadingIcon}</span>
          ) : (
            icon && <span className="mr-2">{icon}</span>
          )}
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={isDisabled || isLoading ? undefined : onClick}
      disabled={isDisabled || isLoading}
      type={htmlType}
    >
      {isLoading ? (
        <span className="mr-2">{LoadingIcon}</span>
      ) : (
        icon && <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;
