"use client";

import { create } from "zustand";
import React, { useEffect, ReactNode } from "react";

const detailForm = create<{ detailForms?: ReactNode }>(() => ({}));
const useDetailForm = () => {
  return detailForm();
};

const DetailForm = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    return () => {
      detailForm.setState({ detailForms: undefined });
    };
  }, []);
  useEffect(() => detailForm.setState({ detailForms: children }), [children]);
  return <></>;
};

export { useDetailForm };
export default DetailForm;
