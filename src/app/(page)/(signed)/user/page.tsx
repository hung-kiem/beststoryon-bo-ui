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
  GetUserListRequest,
  GetUserListResponse,
  UserData,
} from "@/types/user";
import { userApi } from "@apiClient/user-api";
import React, { useState, useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TableUser } from "./TableUser";
import { closeModal, ModalData, openModal } from "@/components/ui/Modal";
import { useRouter } from "next/navigation";

interface FormData {
  status: string;
  userName: string;
}

const initValues: FormData = {
  status: "",
  userName: "",
};

const statusOptions = [
  { label: "Tất cả", value: "" },
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];
const UserListPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [results, setResults] = useState<UserData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: initValues,
  });

  const fetchData = useCallback(
    async (formData: FormData, pageNo: number, pageSize: number) => {
      const payload: GetUserListRequest = {
        userName: formData.userName,
        status: formData.status,
        pageIndex: pageNo,
        pageSize,
      };

      try {
        setLoading(true);
        const response: GetUserListResponse = await userApi.getUserList(
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

  const handleDelete = (chapterId: string) => {
    console.log("handleConfirmDelete", chapterId);
    const data: ModalData = {
      onConfirm: async () => {
        console.log("onSubmitted", chapterId);
        setLoading(true);
        try {
          await userApi.deleteUser(chapterId);
          handleSubmit((data) => fetchData(data, 1, pageSize))();
        } catch (error) {
          console.error("deleteChapter", error);
        } finally {
          setLoading(false);
          closeModal();
        }
      },
    };
    openModal("delete-chapter", data);
  };

  return (
    <>
      <BreadCrumb>
        <BreadcrumbItem pageName="Danh sách truyện" path="#" />
      </BreadCrumb>
      <SearchForm>
        <Controller
          name="userName"
          control={control}
          render={() => (
            <Input
              label="Username"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập username"
              value={watch("userName")}
              onChange={(e) => setValue("userName", e.target.value)}
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
          <FooterButton
            type="outline"
            onClick={() => router.push("/user/create")}
            isLoading={isLoading}
          >
            Thêm mới
          </FooterButton>
        </FooterButtons>
      </Footer>
      <TableList>
        <TableUser
          currentPage={currentPage}
          loading={isLoading}
          pageSize={pageSize}
          totalCount={totalCount}
          data={results}
          onChangePage={handleOnChangePage}
          onChangeRowsPerPage={handleOnChangeRowsPerPage}
          handleDelete={handleDelete}
        />
      </TableList>
    </>
  );
};

export default UserListPage;
