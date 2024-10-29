"use client";
import Loader from "@/components/commons/Loader";
import Breadcrumb from "@/components/ui/Breadcrumbs/Breadcrumb";
import Button from "@/components/ui/Buttons/Button";
import Input from "@/components/ui/Input/Input";
import SelectSingle from "@/components/ui/SelectGroup/SelectSingle";
import TableThree from "@/components/ui/Tables/TableThree";
import { Fragment, useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  status: string;
}

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

const Category = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [pageSize, setPageSize] = useState(20);
  const [pageNo, setPageNo] = useState(1);
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { status: "1" }, // Đặt mặc định là "Hoạt động" với key là 1
  });

  const handlePageChange = (newPageNo: number) => {
    setPageNo(newPageNo);
    console.log("Current Page:", newPageNo);
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
      <Breadcrumb pageName="Danh sách Category" />
      <div className="mb-4 flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black">
        <div className="grid grow grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SelectSingle
                {...field}
                label="Trạng thái"
                items={statusOptions}
              />
            )}
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="primary"
            size="medium"
            href="#"
            onClick={handleSearchClick}
          >
            Tìm kiếm
          </Button>
          <Button type="primary" size="medium" href="#">
            Thêm mới
          </Button>
        </div>
      </div>
    </>
  );
};

export default Category;
