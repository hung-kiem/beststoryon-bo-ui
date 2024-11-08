"use client";

import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TableCategory } from "./TableCategory";
import SearchForm from "@/components/commons/Form/SearchForm";
import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import TableList from "@/components/ui/Tables/useTable";
import {
  CategoryItem,
  SearchCategoryRequest,
  SearchCategoryResponse,
} from "@/types/category";
import { categoryApi } from "../../../../../api-client/category-api";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { useRouter } from "next/navigation";
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

const Category = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [results, setResults] = useState<CategoryItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: initValues,
  });

  const fetchData = useCallback(
    async (formData: FormData, pageNo: number, pageSize: number) => {
      const payload: SearchCategoryRequest = {
        catName: formData.categoryName,
        status: formData.status,
        pageIndex: pageNo,
        pageSize,
      };

      try {
        setLoading(true);
        const response: SearchCategoryResponse = await categoryApi.search(
          payload
        );
        setResults(response.data);
        setTotalCount(response.totalRecord);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    handleSubmit((data) => fetchData(data, 1, pageSize))();
  }, [handleSubmit, fetchData, pageSize]);

  const onSubmit = (data: FormData) => {
    fetchData(data, 1, pageSize);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit, onSubmit]);

  const handleOnChangePage = (page: number) => {
    setCurrentPage(page);
    handleSubmit((data) => fetchData(data, page, pageSize))();
  };

  const handleOnChangeRowsPerPage = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    handleSubmit((data) => fetchData(data, 1, newPageSize))();
  };

  return (
    <>
      <BreadCrumb>
        <BreadcrumbItem pageName="Danh sách danh mục" path="/category" />
      </BreadCrumb>
      <SearchForm>
        <Controller
          name="categoryName"
          control={control}
          render={() => (
            <Input
              label="Tên danh mục"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập tên danh mục"
              value={watch("categoryName")}
              onChange={(e) => setValue("categoryName", e.target.value)}
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
              onSelect={(value) => setValue("status", value)}
              value={watch("status")}
            />
          )}
        />
      </SearchForm>
      <Footer>
        <FooterButtons>
          <FooterButton
            type="primary"
            onClick={handleSubmit(onSubmit)}
            isLoading={isLoading}
          >
            Tìm kiếm
          </FooterButton>
          <FooterButton
            type="outline"
            onClick={() => router.push("/category/create")}
          >
            Thêm mới
          </FooterButton>
        </FooterButtons>
      </Footer>
      <TableList>
        <TableCategory
          currentPage={currentPage}
          loading={isLoading}
          pageSize={pageSize}
          totalCount={totalCount}
          data={results}
          onChangePage={handleOnChangePage}
          onChangeRowsPerPage={handleOnChangeRowsPerPage}
        />
      </TableList>
    </>
  );
};

export default Category;
