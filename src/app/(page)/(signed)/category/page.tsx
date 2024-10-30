"use client";

import Breadcrumb from "@/components/ui/Breadcrumb/BaseBreadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TableCategory } from "./TableCategory";
import SearchForm from "@/components/commons/Form/SearchForm";
import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import TableList from "@/components/ui/Tables/useTable";
import { SearchCategoryRequest } from "@/types/category";
import useSWR from "swr";
import { categoryApi } from "../../../../../api-client/category";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
interface FormData {
  status: string;
  categoryName: string;
}

const initValues: FormData = {
  status: "1",
  categoryName: "",
};

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

const fetcher = async (url: string, payload: SearchCategoryRequest) => {
  const response = await categoryApi.search(payload);
  return response;
};

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: initValues,
  });

  const formData = watch();

  const payload: SearchCategoryRequest = {
    catName: formData.categoryName,
    status: formData.status,
    pageIndex: currentPage,
    pageSize,
  };

  const { data, isLoading } = useSWR(
    ["/admin/cat/search", payload],
    ([_, payload]) => fetcher(_, payload),
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  const onSubmit = () => {
    setCurrentPage(1);
  };

  const handleOnChangePage = (page: number) => {
    console.log("page", page);
    setCurrentPage(page);
  };

  const handleOnChangeRowsPerPage = (newPageSize: number) => {
    console.log("newPageSize", newPageSize);
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return (
    <>
      <BreadCrumb>
        <BreadcrumbItem pageName="Category" path="/category" />
      </BreadCrumb>
      <SearchForm>
        <Controller
          name="categoryName"
          control={control}
          render={({ field }) => (
            <Input
              label="Số điện thoại"
              layout="vertical"
              className="w-full"
              type="tel"
              placeholder="Nhập số điện thoại"
              {...field}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              title="Trạng thái"
              label="Trạng thái"
              options={statusOptions}
              {...field}
            />
          )}
        />
      </SearchForm>
      <Footer>
        <FooterButtons>
          <FooterButton type="primary" onClick={() => handleSubmit(onSubmit)()}>
            Tìm kiếm
          </FooterButton>
        </FooterButtons>
      </Footer>
      <TableList>
        <TableCategory
          currentPage={currentPage}
          loading={isLoading}
          pageSize={pageSize}
          totalCount={data?.totalRecord || 0}
          data={data?.data || []}
          onChangePage={handleOnChangePage}
          onChangeRowsPerPage={handleOnChangeRowsPerPage}
        />
      </TableList>
    </>
  );
};

export default Category;
