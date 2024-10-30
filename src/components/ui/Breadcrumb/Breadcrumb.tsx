"use client";

import { create } from "zustand";
import React, { ReactNode, useEffect } from "react";

const breadCrumb = create<{ breadCrumbs: React.ReactNode }>(() => ({
  breadCrumbs: undefined,
}));

const useBreadCrumb = () => {
  const { breadCrumbs } = breadCrumb();
  return { breadCrumbs };
};

interface BreadCrumbProps {
  children: ReactNode;
}

const BreadCrumb = ({ children }: BreadCrumbProps) => {
  useEffect(() => {
    return () => {
      breadCrumb.setState({ breadCrumbs: undefined });
    };
  }, []);
  useEffect(() => {
    breadCrumb.setState((prev) => ({ ...prev, breadCrumbs: children }));
  }, [children]);
  return <></>;
};

export { useBreadCrumb };
export default BreadCrumb;
