import { Category } from "@/types/category";
import * as React from "react";
import { TableColumn } from "react-data-table-component";
import { HiEye, HiPencilAlt } from "react-icons/hi";
import TableThree from "@/components/ui/Tables/TableThree";

export interface ITableCategoryProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  data: Category[];
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (newPageSize: number) => void;
}

export function TableCategory({
  currentPage,
  pageSize,
  totalCount,
  data,
  loading,
  onChangePage,
  onChangeRowsPerPage,
}: ITableCategoryProps) {
  const columns: TableColumn<Category>[] = [
    {
      name: "STT",
      cell: (row: Category, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
      width: "60px",
    },
    {
      name: "Mã code",
      selector: (row: Category) => row.catCode,
    },
    {
      name: "Tên",
      selector: (row: Category) => row.catName,
    },
    {
      name: "Thứ tự",
      selector: (row: Category) => row.displayOrder,
    },
    {
      name: "Chức năng",
      cell: (row: Category) => (
        <div className="border-gray-5 alight-center flex w-full justify-center gap-2 border-l-2 pl-2">
          <button
            onClick={() => handleViewDetails(row.catId)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Xem chi tiết"
          >
            <HiEye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEdit(row.catId)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Chỉnh sửa"
          >
            <HiPencilAlt className="h-4 w-4" />
          </button>
        </div>
      ),
      width: "150px",
      style: { textAlign: "center" },
    },
  ];

  const handleViewDetails = (id: number) => {
    console.log("Xem chi tiết:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Chỉnh sửa:", id);
  };

  return (
    <React.Fragment>
      <TableThree<Category>
        columns={columns}
        data={data}
        loading={loading}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(page) => onChangePage(page)}
        onPageSizeChange={(newPageSize) => onChangeRowsPerPage(newPageSize)}
      />
    </React.Fragment>
  );
}
