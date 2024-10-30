import { Category } from "@/types/category";
import * as React from "react";
import { TableColumn } from "react-data-table-component";
import { HiDotsVertical, HiEye, HiPencilAlt } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
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
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="border-gray-100 bg-gray-200 text-gray-700 hover:bg-gray-300 inline-flex w-full justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none">
                <HiDotsVertical className="h-5 w-5" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleViewDetails(row.catId)}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } text-gray-700 block w-full px-4 py-2 text-left text-sm`}
                      >
                        Xem chi tiết
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleEdit(row.catId)}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } text-gray-700 block w-full px-4 py-2 text-left text-sm`}
                      >
                        Chỉnh sửa
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleChangeStatus(row.catId)}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } text-gray-700 block w-full px-4 py-2 text-left text-sm`}
                      >
                        Đổi trạng thái
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ),
      width: "200px",
      center: true,
    },
  ];

  const handleViewDetails = (id: number) => {
    console.log("Xem chi tiết:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Chỉnh sửa:", id);
  };

  const handleChangeStatus = (id: number) => {
    console.log("Đổi trạng thái:", id);
  };

  return (
    <React.Fragment>
      <TableThree
        columns={columns}
        data={data}
        loading={loading}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={onChangePage}
        onPageSizeChange={onChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
