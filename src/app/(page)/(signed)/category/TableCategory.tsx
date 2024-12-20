import { CategoryItem } from "@/types/category";
import * as React from "react";
import { TableColumn } from "react-data-table-component";
import { HiEye, HiPencilAlt } from "react-icons/hi";
import TableThree from "@/components/ui/Tables/TableThree";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@utils/dateUtils";

export interface ITableCategoryProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  data: CategoryItem[];
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
  const router = useRouter();
  const columns: TableColumn<CategoryItem>[] = [
    {
      name: "STT",
      cell: (row: CategoryItem, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
      width: "60px",
    },
    {
      name: "Tên danh mục",
      selector: (row: CategoryItem) => row.catName,
    },
    {
      name: "Mã danh mục",
      selector: (row: CategoryItem) => row.catCode,
    },
    {
      name: "Trạng thái",
      selector: (row: CategoryItem) => row.status,
      cell: (row: CategoryItem) => (
        <p
          className={`!text-xxs font-regular inline-flex rounded-full bg-opacity-10 px-3 py-1 ${
            row.status === "1"
              ? "bg-success text-success"
              : row.status === "0"
              ? "bg-danger text-danger"
              : "bg-warning text-warning"
          }`}
        >
          {row.status === "1" ? "Hoạt động" : "Khóa"}
        </p>
      ),
    },
    {
      name: "Website gốc",
      selector: (row: CategoryItem) => row.originSite,
    },
    {
      name: "Thứ tự",
      selector: (row: CategoryItem) => row.displayOrder,
      center: true,
      style: { textAlign: "center" },
    },
    {
      name: "Ngày tạo",
      selector: (row: CategoryItem) =>
        row.createdDate ? formatDateTime(row.createdDate) : "",
      center: true,
      style: { textAlign: "center" },
      width: "150px",
    },
    {
      name: "Chức năng",
      cell: (row: CategoryItem) => (
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
      center: true,
    },
  ];

  const handleViewDetails = (id: string) => {
    router.push(`/category/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/category/edit/${id}`);
  };

  return (
    <React.Fragment>
      <TableThree
        columns={columns}
        data={data}
        loading={loading}
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onChangePage}
        onPageSizeChange={onChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
