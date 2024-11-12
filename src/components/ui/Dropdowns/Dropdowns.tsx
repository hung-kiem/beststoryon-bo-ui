"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import IconThreeDot from "@/components/ui/icons/IconThreeDot";

interface DropdownsProps {
  children: ReactNode;
  label?: ReactNode;
}

export default function Dropdowns({ children, label }: DropdownsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        dropdown.current.contains(target as Node) ||
        (trigger.current && trigger.current.contains(target as Node))
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key !== "Escape") return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <div className="relative flex">
      <button
        className="p-2 text-[#98A6AD] hover:text-body"
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {label || <IconThreeDot />}
      </button>
      <div
        ref={dropdown}
        className={`absolute right-0 top-full z-40 min-w-20 space-y-1 whitespace-nowrap rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

interface DropdownItemProps {
  children: ReactNode;
  role?: "button" | "link";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const dropdownItemClassName =
  "flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4";

export function DropdownItem({
  children,
  role,
  href,
  onClick,
  className,
}: DropdownItemProps) {
  if (role == "link") {
    return (
      <Link
        href={href || "#"}
        className={classNames(dropdownItemClassName, className)}
      >
        {children}
      </Link>
    );
  }
  return (
    <div
      role={"button"}
      className={classNames(dropdownItemClassName, className)}
      onClick={() => onClick?.()}
    >
      {children}
    </div>
  );
}
