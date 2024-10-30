"use client";

import { create } from "zustand";
import { useEffect, ReactNode } from "react";

const searchForm = create<{ searchForms?: ReactNode }>(() => ({}));
const useSearchForm = () => {
  return searchForm();
};

const SearchForm = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    return () => {
      searchForm.setState({ searchForms: undefined });
    };
  }, []);
  useEffect(() => searchForm.setState({ searchForms: children }), [children]);
  return <></>;
};

export { useSearchForm };
export default SearchForm;
