"use client";

import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import SearchForm from "@/components/commons/Form/SearchForm";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import TableList from "@/components/ui/Tables/useTable";
import {
  BannerData,
  GetBannerListRequest,
  GetBannerListResponse,
} from "@/types/banner";
import { bannerApi } from "@apiClient/banner-api";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { TableBanner } from "./TableBanner";

interface FormData {
  status: string;
  bannerName: string;
}

const initValues: FormData = {
  status: "1",
  bannerName: "",
};

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

const BannerListPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [results, setResults] = useState<BannerData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: initValues,
  });

  const fetchData = useCallback(
    async (formData: FormData, pageNo: number, pageSize: number) => {
      const payload: GetBannerListRequest = {
        bannerName: formData.bannerName,
        status: formData.status,
        pageIndex: pageNo,
        pageSize,
      };

      try {
        setLoading(true);
        const response: GetBannerListResponse = await bannerApi.getBannerList(
          payload
        );
        setResults(response.data);
        setTotalCount(response.totalRecords);
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
        <BreadcrumbItem pageName="Danh sách banner" path="#" />
      </BreadCrumb>
      <SearchForm>
        <Controller
          name="bannerName"
          control={control}
          render={() => (
            <Input
              label="Tên banner"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập tên banner"
              value={watch("bannerName")}
              onChange={(e) => setValue("bannerName", e.target.value)}
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
            onClick={() => router.push("/banner/create")}
          >
            Thêm mới
          </FooterButton>
        </FooterButtons>
      </Footer>
      <TableList>
        <TableBanner
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

export default BannerListPage;
