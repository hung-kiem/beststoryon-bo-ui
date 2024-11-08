import TableThree from "@/components/ui/Tables/TableThree";
import { StoryData } from "@/types/story";
import { useRouter } from "next/navigation";
import * as React from "react";
import { TableColumn } from "react-data-table-component";
import { HiCollection, HiEye, HiPencilAlt } from "react-icons/hi";
import { convertDateFormat, formatDate } from "../../../../../utils/dateUtils";

export interface TableStoryProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  data: StoryData[];
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (newPageSize: number) => void;
}

export function TableStory({
  currentPage,
  pageSize,
  totalCount,
  data,
  loading,
  onChangePage,
  onChangeRowsPerPage,
}: TableStoryProps) {
  const router = useRouter();
  const columns: TableColumn<StoryData>[] = [
    {
      name: "STT",
      cell: (_a, index: number) => (currentPage - 1) * pageSize + index + 1,
      width: "60px",
    },
    {
      name: "Tên truyện",
      selector: (row: StoryData) => row.storyName,
      width: "600px",
    },
    {
      name: "Số chương",
      selector: (row: StoryData) => row.chapterNumber,
      width: "100px",
      center: true,
    },
    {
      name: "Is Hot",
      selector: (row: StoryData) => row.isHot,
      cell: (row: StoryData) => (
        <p
          className={`!text-xxs font-regular inline-flex rounded-full bg-opacity-10 px-3 py-1 ${
            row.isHot === "1"
              ? "bg-success text-success"
              : row.isHot === "0"
              ? "bg-danger text-danger"
              : "bg-warning text-warning"
          }`}
        >
          {row.isHot === "1" ? "Có" : "Không"}
        </p>
      ),
      center: true,
      style: { textAlign: "center" },
      width: "120px",
    },
    {
      name: "Is Top Focus",
      selector: (row: StoryData) => row.isTopFocus,
      cell: (row: StoryData) => (
        <p
          className={`!text-xxs font-regular inline-flex rounded-full bg-opacity-10 px-3 py-1 ${
            row.isTopFocus === "1"
              ? "bg-success text-success"
              : row.isTopFocus === "0"
              ? "bg-danger text-danger"
              : "bg-warning text-warning"
          }`}
        >
          {row.isTopFocus === "1" ? "Có" : "Không"}
        </p>
      ),
      center: true,
      style: { textAlign: "center" },
      width: "120px",
    },
    {
      name: "Lượt like",
      selector: (row: StoryData) => row.likeCount || "",
      width: "150px",
      center: true,
    },
    {
      name: "Trạng thái",
      selector: (row: StoryData) => row.status,
      cell: (row: StoryData) => (
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
      style: { textAlign: "center" },
      width: "120px",
    },
    {
      name: "Trạng thái truyện",
      selector: (row: StoryData) => row.storyStatus,
      width: "150px",
      center: true,
    },
    {
      name: "Tác giả",
      selector: (row: StoryData) => row.storyAuthor,
      width: "150px",
    },
    {
      name: "Ngày tạo",
      selector: (row: StoryData) => {
        return row.createdDate || "";
      },
      center: true,
      style: { textAlign: "center" },
      width: "100px",
    },
    {
      name: "Chức năng",
      cell: (row: StoryData) => (
        <div className="border-gray-5 alight-center flex w-full justify-center gap-2 border-l-2 pl-2">
          <button
            onClick={() => handleViewDetails(row.storyIdStr)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Xem chi tiết"
          >
            <HiEye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEdit(row.storyIdStr)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Chỉnh sửa"
          >
            <HiPencilAlt className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleViewChapters(row.storyIdStr)}
            className="text-gray-700 flex w-10 items-center justify-center rounded-md bg-gray-2 px-2 py-1 text-sm font-medium hover:bg-gray-3 focus:outline-none"
            title="Xem danh sách chương"
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

  const handleViewDetails = (id: string) => {
    console.log("handleViewDetails", id);
    router.push(`/story/${id}`);
  };

  const handleEdit = (id: string) => {
    console.log("handleEdit", id);
    router.push(`/story/edit/${id}`);
  };

  const handleViewChapters = (id: string) => {
    console.log("handleViewChapters", id);
    router.push(`/story/${id}/chapters`);
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
