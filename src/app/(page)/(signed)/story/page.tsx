"use client";

import {
  SearchStoryRequest,
  SearchStoryResponse,
  StoryData,
} from "@/types/story";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { storyApi } from "../../../../../api-client/story-api";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import SearchForm from "@/components/commons/Form/SearchForm";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import TableList from "@/components/ui/Tables/useTable";
import { TableStory } from "./TableStory";
import SelectCategory from "../(component)/SelectCategory";

interface FormData {
  catId: string;
  status: string;
  storyName: string;
}

const initValues: FormData = {
  status: "1",
  storyName: "",
  catId: "",
};

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

const StoryList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [results, setResults] = useState<StoryData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: initValues,
  });

  const fetchData = useCallback(
    async (formData: FormData, pageNo: number, pageSize: number) => {
      const payload: SearchStoryRequest = {
        catId: formData.catId === "" ? "0" : formData.catId,
        storyName: formData.storyName,
        status: formData.status,
        pageIndex: pageNo,
        pageSize,
      };

      try {
        setLoading(true);
        const response: SearchStoryResponse = await storyApi.search(payload);
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
        <BreadcrumbItem pageName="Danh sách truyện" path="#" />
      </BreadCrumb>
      <SearchForm>
        <Controller
          name="catId"
          control={control}
          render={() => (
            <SelectCategory
              onChange={(value) => setValue("catId", value)}
              defaultValue={watch("catId")}
            />
          )}
        />
        <Controller
          name="storyName"
          control={control}
          render={() => (
            <Input
              label="Tên truyện"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập tên truyện"
              value={watch("storyName")}
              onChange={(e) => setValue("storyName", e.target.value)}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={() => (
            <Select
              title="Trạng thái"
              label="Trạng thái"
              options={statusOptions}
              value={watch("status")}
              onSelect={(value) => setValue("status", value)}
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
        </FooterButtons>
      </Footer>
      <TableList>
        <TableStory
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

export default StoryList;
