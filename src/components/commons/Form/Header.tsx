"use client";

import Button from "@/components/ui/Buttons/Button";
import React, { useEffect, ReactNode } from "react";
import { create } from "zustand";

const header = create<{ title: string; buttons?: ReactNode }>(() => ({
  title: "",
}));

const useHeaders = () => {
  return header();
};

const Header = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    return () => {
      header.setState({ title: "", buttons: undefined });
    };
  }, []);
  return <>{children}</>;
};

export const Title = ({ children }: { children: string }) => {
  useEffect(() => {
    header.setState((prev) => ({ ...prev, title: children }));
  }, [children]);
  return null;
};

export const Buttons = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    header.setState((prev) => ({ ...prev, buttons: children }));
  }, [children]);
  return null;
};

export const ButtonHeader = ({
  children,
  type = "primary",
  size = "medium",
  onClick = () => {},
}: {
  children: ReactNode;
  className?: string;
  type?: "primary" | "secondary" | "black" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}) => {
  return (
    <Button type={type} size={size} onClick={onClick}>
      {children}
    </Button>
  );
};

export { useHeaders };
export default Header;
