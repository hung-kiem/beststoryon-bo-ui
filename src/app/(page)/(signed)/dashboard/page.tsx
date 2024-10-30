"use client";

import Breadcrumb from "@/components/ui/Breadcrumb/BaseBreadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import Button from "@/components/ui/Buttons/Button";
import TableThree from "@/components/ui/Tables/TableThree";
import { useState } from "react";
import { TableColumn } from "react-data-table-component";

type UserRow = {
  id: number;
  user: string;
  fullName: string;
  email: string;
  tel: string;
  index?: number;
  status: string;
  role: string;
};

const columns: TableColumn<UserRow>[] = [
  {
    name: "No.",
    selector: (row: UserRow) => row.index ?? 0,
    sortable: true,
    cell: (row: UserRow) => <div style={{ margin: "auto" }}>{row.index}</div>,
    width: "60px",
  },
  {
    name: "Tên đăng nhập",
    selector: (row: UserRow) => row.user,
    sortable: true,
    reorder: true,
  },
  {
    name: "Họ và tên",
    selector: (row: UserRow) => row.fullName,
    sortable: true,
    reorder: true,
  },
  {
    name: "Email",
    selector: (row: UserRow) => row.email,
    sortable: true,
    reorder: true,
  },
  {
    name: "Email",
    selector: (row: UserRow) => row.email,
    sortable: true,
    reorder: true,
  },
  {
    name: "Email",
    selector: (row: UserRow) => row.email,
    sortable: true,
    reorder: true,
  },
  {
    name: "Số điện thoại",
    selector: (row: UserRow) => row.tel,
    sortable: true,
    reorder: true,
  },
  {
    name: "Nhóm quyền",
    selector: (row: UserRow) => row.role,
    sortable: true,
    reorder: true,
  },
  {
    name: "Status",
    selector: (row: UserRow) => row.status,
    cell: (row: UserRow) => (
      <p
        className={`!text-xxs font-regular inline-flex rounded-full bg-opacity-10 px-3 py-1 ${
          row.status === "Hoạt động"
            ? "bg-success text-success"
            : row.status === "Khóa"
            ? "bg-danger text-danger"
            : "bg-warning text-warning"
        }`}
      >
        {row.status}
      </p>
    ),
    sortable: true,
    reorder: true,
  },
];

const data: UserRow[] = [
  {
    id: 1,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Hoạt động",
  },
  {
    id: 2,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Hoạt động",
  },
  {
    id: 3,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Hoạt động",
  },
  {
    id: 4,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Hoạt động",
  },
  {
    id: 5,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Hoạt động",
  },
  {
    id: 6,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 7,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 8,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 9,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 10,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 11,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 12,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 13,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 14,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 15,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 16,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 17,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 18,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 19,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Khóa",
  },
  {
    id: 20,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Chờ kích hoạt",
  },
  {
    id: 21,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Chờ kích hoạt",
  },
  {
    id: 22,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Chờ kích hoạt",
  },
  {
    id: 23,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Chờ kích hoạt",
  },
  {
    id: 24,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Chờ kích hoạt",
  },
  {
    id: 25,
    user: "tuoibt",
    fullName: "Bùi Thị Tươi",
    email: "tuoibt@vnpay.vn",
    tel: "0123456789",
    role: "Quản trị viên",
    status: "Chờ kích hoạt",
  },
].map((item, index) => ({ ...item, index: index + 1 }));

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);

  const [pageSize, setPageSize] = useState(20);
  const [pageNo, setPageNo] = useState(1);

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
    console.log("Current Page:", pageNo);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    console.log("Page Size:", newPageSize);
  };

  const handleSearchClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem pageName="Tìm kiếm" path="/train/search" />
      </Breadcrumb>
      <div className="mb-4 flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black">
        <div className="flex gap-2">
          <Button
            type="primary"
            size="medium"
            href="#"
            onClick={handleSearchClick}
          >
            Tìm kiếm
          </Button>
          <Button type="outline" size="medium" href="#">
            Xuất excel
          </Button>
          <Button type="primary" size="medium" href="#">
            Thêm mới
          </Button>
        </div>
      </div>
      <TableThree
        totalCount={data.length}
        data={data}
        loading={loading}
        columns={columns}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
}
