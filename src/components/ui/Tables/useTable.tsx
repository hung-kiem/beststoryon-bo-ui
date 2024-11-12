"use client";

import { create } from "zustand";
import React, { useEffect, ReactNode } from "react";

const table = create<{ table?: ReactNode }>(() => ({}));
const useTable = () => {
  return table();
};

const TableList = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    return () => {
      table.setState({ table: undefined });
    };
  }, []);
  useEffect(() => table.setState({ table: children }), [children]);
  return <></>;
};

const TableFormHeader = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    table.setState({ table: children });
  }, [children]);
  return <></>;
};

const TableFormBody = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    table.setState({ table: children });
  }, [children]);
  return <></>;
};

const TableFormRow = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    table.setState({ table: children });
  }, [children]);
  return <></>;
};

export { useTable, TableFormHeader, TableFormBody, TableFormRow };
export default TableList;
