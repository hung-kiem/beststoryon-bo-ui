import TableThree from "@/components/ui/Tables/TableThree";
import { ChapterData } from "@/types/chapter";
import { formatDateTime } from "@utils/dateUtils";
import { useRouter } from "next/navigation";
import React from "react";
import { TableColumn } from "react-data-table-component";
import { HiEye, HiPencilAlt, HiRefresh, HiTrash } from "react-icons/hi";

export interface TableChapterProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  data: ChapterData[];
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (newPageSize: number) => void;
  handleReCrawl: (chapterId: string) => void;
  handleDelete: (chapterId: string) => void;
}

export function TableChapter({
  currentPage,
  pageSize,
  totalCount,
  data,
  loading,
  onChangePage,
  onChangeRowsPerPage,
  handleReCrawl,
  handleDelete,
}: TableChapterProps) {
  const router = useRouter();
  const columns: TableColumn<ChapterData>[] = [
    {
      name: "STT",
      cell: (_a, index: number) => (currentPage - 1) * pageSize + index + 1,
      width: "60px",
    },
    {
      name: "Tên chương",
      selector: (row: ChapterData) => row.chapterName,
      width: "500px",
    },
    {
      name: "Chương",
      selector: (row: ChapterData) => row.chapterNumber,
      width: "100px",
      center: true,
    },

    {
      name: "Số lượt like",
      selector: (row: ChapterData) => row.likeCount || "0",
      width: "150px",
      center: true,
    },
    {
      name: "Trạng thái",
      selector: (row: ChapterData) => row.status,
      cell: (row: ChapterData) => (
        <p
          className={`!text-xxs font-regular inline-flex rounded-full bg-opacity-10 px-3 py-1 ${
            row.status === "1"
              ? "bg-success text-success"
              : row.status === "0"
              ? "bg-danger text-danger"
              : "bg-warning text-warning"
          }`}
        >
          {row.status === "1" ? "Hoạt động" : "Không hoạt động"}
        </p>
      ),
      center: true,
      style: { textAlign: "center" },
      width: "120px",
    },
    {
      name: "Ngày tạo",
      selector: (row: ChapterData) => {
        return row.createdDate ? formatDateTime(row.createdDate) : "";
      },
      center: true,
      style: { textAlign: "center" },
      width: "200px",
    },
    {
      name: "Người tạo",
      selector: (row: ChapterData) => row.createdBy,
      width: "150px",
    },
    {
      name: "Chức năng",
      cell: (row: ChapterData) => (
        <div className="border-gray-5 alight-center flex w-full justify-center gap-2 border-l-2 pl-2">
          <button
            onClick={() => {
              router.push(
                `/story/${row.storyIdStr}/chapters/${row.chapterIdStr}`
              );
            }}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Xem chi tiết"
          >
            <HiEye className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              router.push(
                `/story/${row.storyIdStr}/chapters/edit/${row.chapterIdStr}`
              );
            }}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Chỉnh sửa"
          >
            <HiPencilAlt className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleReCrawl(row.chapterIdStr)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Crawl chương"
          >
            <HiRefresh className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(row.chapterIdStr)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Xóa chương"
          >
            <HiTrash className="h-4 w-4" />
          </button>
        </div>
      ),
      width: "170px",
      style: { textAlign: "center" },
      center: true,
    },
  ];

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
