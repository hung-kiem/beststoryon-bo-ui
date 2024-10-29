"use client";
import Loader from "@/components/commons/Loader";
import React from "react";
import DataTable, {
  TableColumn,
  createTheme,
} from "react-data-table-component";
import useTheme from "@hooks/useTheme";

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  pageSize: number;
  loading: Boolean;
  onPageChange: (pageNo: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

createTheme(
  "solarized",
  {
    text: { primary: "#fff", secondary: "#2aa198" },
    background: { default: "rgb(36 48 63)" },
    context: { background: "#cb4b16", text: "#FFFFFF" },
    divider: { default: "#073642" },
    button: {
      default: "#2aa198",
      hover: "rgba(0,0,0,.08)",
      focus: "rgba(255,255,255,.12)",
      disabled: "rgba(255, 255, 255, .34)",
    },
    sortFocus: { default: "#2aa198" },
    headCells: {
      style: {
        backgroundColor: "#fff",
      },
    },
  },
  "dark"
);

createTheme(
  "lightmode",
  {
    text: { primary: "#000000", secondary: "#555555" },
    background: { default: "#ffffff" },
    context: { background: "#e3f2fd", text: "#000000" },
    divider: { default: "#e0e0e0" },
    button: {
      default: "#e0e0e0",
      hover: "rgba(0,0,0,.08)",
      focus: "rgba(0,0,0,.12)",
      disabled: "rgba(0,0,0,.34)",
    },
    sortFocus: { default: "#000000" },
    headCells: {
      style: {
        backgroundColor: "#d8e0e8",
      },
    },
  },
  "light"
);

const customStyles = {
  table: {
    style: {
      borderRadius: "0px",
    },
  },
  rows: {
    style: {
      minHeight: "30px",
      fontSize: "13px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontSize: "14px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      paddingTop: "4px",
      paddingBottom: "4px",
    },
  },
};

const TableThree = <T extends object>({
  data,
  columns,
  pageSize,
  loading,
  onPageChange,
  onPageSizeChange,
}: TableProps<T>) => {
  const isDarkMode = useTheme("dark");

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const handleRowsPerPageChange = (newPageSize: number) => {
    onPageSizeChange(newPageSize);
  };

  return (
    <div className="overflow-hidden rounded-lg">
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            theme={isDarkMode ? "solarized" : "lightmode"}
            pagination
            paginationPerPage={pageSize}
            paginationRowsPerPageOptions={[10, 20, 40, 60, 80, 100]}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            className="!rounded-none"
          />
        </>
      )}
    </div>
  );
};

export default TableThree;
