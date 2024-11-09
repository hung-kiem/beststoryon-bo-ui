import TableThree from "@/components/ui/Tables/TableThree";
import { ChapterData } from "@/types/chapter";
import { formatDateTime } from "@utils/dateUtils";
import { useRouter } from "next/navigation";
import React from "react";
import { TableColumn } from "react-data-table-component";
import { HiCollection, HiEye, HiPencilAlt } from "react-icons/hi";

export interface TableChapterProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  data: ChapterData[];
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (newPageSize: number) => void;
  handleReCrawl: (chapterId: string) => void;
  handleDeleteChapter: (chapterId: string) => void;
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
            onClick={() => handleViewDetails(row.chapterIdStr, row.storyIdStr)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Xem chi tiết"
          >
            <HiEye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEdit(row.chapterIdStr)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Chỉnh sửa"
          >
            <HiPencilAlt className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCrawlChapter(row.chapterIdStr)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Crawl chương"
          >
            <HiCollection className="h-4 w-4" />
          </button>
        </div>
      ),
      width: "150px",
      style: { textAlign: "center" },
      center: true,
    },
  ];

  const handleViewDetails = (id: string, storyId: string) => {
    console.log("handleViewDetails", id);
    router.push(`/story/${storyId}/chapters/${id}`);
  };

  const handleEdit = (id: string) => {
    console.log("handleEdit", id);
    router.push(`/story/edit/${id}`);
  };

  const handleCrawlChapter = (id: string) => {
    console.log("handleViewChapters", id);
    handleReCrawl(id);
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
