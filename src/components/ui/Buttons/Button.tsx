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
  isLoading?: boolean; // Thêm thuộc tính isLoading
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
  isLoading = false,
}) => {
  const buttonClasses = classNames(
    className,
    "inline-flex items-center justify-center whitespace-nowrap border text-center font-medium transition",
    {
      "border-primary bg-primary text-white": type === "primary" && !isDisabled,
      "border-primary text-primary hover:bg-primary hover:text-white":
        type === "outline" && !isDisabled,
      "border-secondary bg-secondary text-white":
        type === "secondary" && !isDisabled,
      "border-secondary text-secondary hover:bg-secondary hover:text-white":
        type === "outline-secondary" && !isDisabled,
      "border-black bg-black text-white hover:bg-[rgb(46,50,54)] dark:border-white dark:hover:bg-[rgb(21,22,23)]":
        !type || (type === "black" && !isDisabled),
      "border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white":
        type === "outline-black" && !isDisabled,

      "h-[36px] px-4 text-sm": size === "small",
      "text-md h-[42px] px-6": size === "medium",
      "h-[56px] px-8 text-lg": size === "large",
      "rounded-full": size === "large",
      "rounded-lg": size !== "large",

      "opacity-50 cursor-not-allowed": isDisabled || isLoading,
      "hover:bg-opacity-90": !isDisabled && !isLoading,
    }
  );

  const content = (
    <>
      {isLoading ? (
        <span className="loader mr-2 inline-block h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
      ) : (
        !!icon && <span className="mr-2">{icon}</span>
      )}
      {children}
    </>
  );

  if (href && !isDisabled && !isLoading) {
    return (
      <Link href={href} onClick={onClick} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={!isDisabled && !isLoading ? onClick : undefined}
      disabled={isDisabled || isLoading}
    >
      {content}
    </button>
  );
};

export default Button;
