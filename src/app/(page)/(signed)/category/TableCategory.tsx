import TableThree from "@/components/ui/Tables/TableThree";
import { Category } from "@/types/category";
import * as React from "react";
import { TableColumn } from "react-data-table-component";

export interface TableCategoryProps {
  data: any;
  loading: boolean;
  pageSize: number;
  currentPage: number;
  onPageChange: (newPageNo: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

export function TableCategory({
  data,
  loading,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: TableCategoryProps) {
  const columns: TableColumn<Category>[] = [
    {
      name: "No.",
      cell: (row: Category, index = 0) => (
        <div style={{ margin: "auto" }}>
          {(currentPage - 1) * pageSize + index + 1}
        </div>
      ),
      width: "60px",
    },
    {
      name: "Category Name",
      selector: (row: Category) => row.catName,
    },
    {
      name: "Status",
      selector: (row: Category) =>
        row.status === "1" ? "Hoạt động" : "Không hoạt động",
    },
    {
      name: "Status",
      selector: (row: Category) => row.status,
    },
  ];

  return (
    <TableThree
      data={data}
      loading={loading}
      columns={columns}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
}
