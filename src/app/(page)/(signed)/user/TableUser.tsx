import * as React from "react";
import { TableColumn } from "react-data-table-component";
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";
import TableThree from "@/components/ui/Tables/TableThree";
import { useRouter } from "next/navigation";
import { UserData } from "@/types/user";
import { formatDateTime } from "@utils/dateUtils";

export interface TableUserProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  data: UserData[];
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (newPageSize: number) => void;
  handleDelete: (chapterId: string) => void;
}

export function TableUser({
  currentPage,
  pageSize,
  totalCount,
  data,
  loading,
  onChangePage,
  onChangeRowsPerPage,
  handleDelete,
}: TableUserProps) {
  const router = useRouter();
  const columns: TableColumn<UserData>[] = [
    {
      name: "STT",
      cell: (row: UserData, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
      width: "60px",
    },
    {
      name: "Username",
      selector: (row: UserData) => row.userName,
    },
    {
      name: "Nhóm quyền",
      selector: (row: UserData) => row.roleName,
    },
    {
      name: "Trạng thái",
      selector: (row: UserData) => row.status,
      cell: (row: UserData) => (
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
      name: "Ngày tạo",
      selector: (row: UserData) =>
        row.createdDate ? formatDateTime(row.createdDate) : "",
      center: true,
      style: { textAlign: "center" },
      width: "150px",
    },
    {
      name: "Chức năng",
      cell: (row: UserData) => (
        <div className="border-gray-5 alight-center flex w-full justify-center gap-2 border-l-2 pl-2">
          <button
            onClick={() => handleViewDetails(row.userName)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Xem chi tiết"
          >
            <HiEye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEdit(row.userName)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Chỉnh sửa"
          >
            <HiPencilAlt className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(row.userName)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Xóa chương"
          >
            <HiTrash className="h-4 w-4" />
          </button>
        </div>
      ),
      width: "150px",
      style: { textAlign: "center" },
      center: true,
    },
  ];

  const handleViewDetails = (id: string) => {
    router.push(`/user/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/user/edit/${id}`);
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
