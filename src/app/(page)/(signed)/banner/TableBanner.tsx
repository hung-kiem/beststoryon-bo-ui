import React from "react";
import { TableColumn } from "react-data-table-component";
import { HiEye, HiPencilAlt } from "react-icons/hi";
import TableThree from "@/components/ui/Tables/TableThree";
import { useRouter } from "next/navigation";
import { formatDateTime } from "../../../../../utils/dateUtils";
import { BannerData } from "@/types/banner";

export interface TableBannerProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  data: BannerData[];
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (newPageSize: number) => void;
}

export function TableBanner({
  currentPage,
  pageSize,
  totalCount,
  data,
  loading,
  onChangePage,
  onChangeRowsPerPage,
}: TableBannerProps) {
  const router = useRouter();
  const columns: TableColumn<BannerData>[] = [
    {
      name: "STT",
      cell: (_, index: number) => (currentPage - 1) * pageSize + index + 1,
      width: "60px",
    },
    {
      name: "Tên banner",
      selector: (row: BannerData) => row.bannerName || "",
    },
    {
      name: "Banner page",
      selector: (row: BannerData) => row.bannerPage || "",
      center: true,
    },
    {
      name: "Trạng thái",
      selector: (row: BannerData) => row.status,
      cell: (row: BannerData) => (
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
      center: true,
    },
    {
      name: "Vị trí banner",
      selector: (row: BannerData) => row.bannerPos || "",
      center: true,
    },
    {
      name: "Ảnh",
      cell: (row: BannerData) =>
        row.bannerUrl ? (
          <img
            src={row.bannerUrl}
            alt="Banner"
            className="object-cover rounded"
            style={{ width: "100px", height: "60px" }}
          />
        ) : null,
      center: true,
      style: { textAlign: "center" },
    },
    {
      name: "Ngày tạo",
      selector: (row: BannerData) =>
        row.createdDate ? formatDateTime(row.createdDate) : "",
      center: true,
      style: { textAlign: "center" },
      width: "150px",
    },
    {
      name: "Chức năng",
      cell: (row: BannerData) => (
        <div className="border-gray-5 alight-center flex w-full justify-center gap-2 border-l-2 pl-2">
          <button
            onClick={() => handleViewDetails(row.bannerId.toString())}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Xem chi tiết"
          >
            <HiEye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEdit(row.bannerId.toString())}
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
    router.push(`/banner/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/banner/edit/${id}`);
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
