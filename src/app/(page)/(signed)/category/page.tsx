"use client";

import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import { useEffect, useState } from "react";
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
  const [pageSize, setPageSize] = useState(2);
  const [isSearching, setIsSearching] = useState(false);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: initValues,
  });

  const [payload, setPayload] = useState<SearchCategoryRequest>({
    catName: "",
    status: "1",
    pageIndex: currentPage,
    pageSize,
  });

  const { data, isLoading } = useSWR(
    isSearching ? ["/admin/cat/search", payload] : null,
    ([_, payload]) => fetcher(_, payload),
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  useEffect(() => {
    setIsSearching(true);
  }, []);

  const onSubmit = (values: FormData) => {
    console.log(values);
    setPayload({
      catName: values.categoryName,
      status: values.status,
      pageIndex: currentPage,
      pageSize,
    });
    setIsSearching(true);
  };

  const handleOnChangePage = (page: number) => {
    console.log(page);
    setCurrentPage(page);
    setPayload((prev) => ({ ...prev, pageNo: page }));
  };

  const handleOnChangeRowsPerPage = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    setPayload((prev) => ({ ...prev, pageSize: newPageSize, pageNo: 1 }));
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
              label="Tên danh mục"
              layout="vertical"
              className="w-full"
              type="tel"
              placeholder="Nhập tên danh mục"
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
              onSelect={(value) => field.onChange(value)}
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
