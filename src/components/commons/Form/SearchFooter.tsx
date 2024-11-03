"use client";

import Button from "@/components/ui/Buttons/Button";
import React, { useEffect, ReactNode } from "react";
import { create } from "zustand";

const searchFooter = create<{ title: string; buttonsFooter?: ReactNode }>(
  () => ({
    title: "",
  })
);

const useSearchFooters = () => {
  return searchFooter();
};

const Footer = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    return () => {
      searchFooter.setState({ buttonsFooter: undefined });
    };
  }, []);
  return <>{children}</>;
};

export const FooterButtons = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    searchFooter.setState((prev) => ({ ...prev, buttonsFooter: children }));
  }, [children]);
  return null;
};

export const FooterButton = ({
  children,
  type = "primary",
  size = "medium",
  isDisabled = false,
  isLoading = false,
  onClick = () => {},
}: {
  children: ReactNode;
  className?: string;
  type?: "primary" | "secondary" | "black" | "outline";
  size?: "small" | "medium" | "large";
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      type={type}
      size={size}
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

export { useSearchFooters };
export default Footer;
