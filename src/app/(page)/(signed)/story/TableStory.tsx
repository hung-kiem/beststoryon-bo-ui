import TableThree from "@/components/ui/Tables/TableThree";
import { StoryData } from "@/types/story";
import { useRouter } from "next/navigation";
import * as React from "react";
import { TableColumn } from "react-data-table-component";
import { HiEye, HiPencilAlt } from "react-icons/hi";

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
      cell: (row: StoryData, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
      width: "60px",
    },
    {
      name: "Tên truyện",
      selector: (row: StoryData) => row.storyName,
    },
    {
      name: "Tác giả",
      selector: (row: StoryData) => row.storyAuthor,
    },
    {
      name: "Thứ tự hiển thị",
      selector: (row: StoryData) => row.displayOrder,
    },
    {
      name: "Trạng thái",
      selector: (row: StoryData) => row.status,
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
        </div>
      ),
      width: "150px",
      style: { textAlign: "center" },
    },
  ];

  const handleViewDetails = (id: string) => {
    console.log("handleViewDetails", id);
    router.push(`/story/${id}`);
  };

  const handleEdit = (id: string) => {
    console.log("handleEdit", id);
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
