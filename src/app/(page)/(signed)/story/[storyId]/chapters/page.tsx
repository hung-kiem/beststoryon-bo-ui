"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { storyApi } from "@apiClient/story-api";
import useSWR from "swr";
import Loader from "@/components/commons/Loader";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import InputDetail from "@/components/ui/Input/InputDetail";
import CollapsibleCard from "@/components/ui/CollapsibleCard/CollapsibleCard";
import {
  ChapterData,
  GetChapterListRequest,
  GetChapterListResponse,
} from "@/types/chapter";
import { Controller, useForm } from "react-hook-form";
import SearchForm from "@/components/commons/Form/SearchForm";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import { chapterApi } from "@apiClient/chapter-api";
import DetailForm from "@/components/commons/Form/DetailForm";
import TableList from "@/components/ui/Tables/useTable";
import { TableChapter } from "./TableChapter";
import { closeModal, ModalData, openModal } from "@/components/ui/Modal";

const fetcher = async (id: string) => {
  const response = await storyApi.getDetail(id);
  return response;
};

interface FormData {
  chapterName: string;
  status: string;
}

const initValues: FormData = {
  status: "1",
  chapterName: "",
};

const statusOptions = [
  { label: "Sử dụng", value: "1" },
  { label: "Không sử dụng", value: "0" },
];

const ChaptersPage = () => {
  const params = useParams();
  const { storyId } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [results, setResults] = useState<ChapterData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: initValues,
  });

  const { data: detail, isLoading } = useSWR(
    ["/admin/story/getById", storyId ? ["storyId", storyId] : null],
    () => fetcher((storyId as string) || ""),
    {
      revalidateOnFocus: false,
    }
  );

  const fetchData = useCallback(
    async (formData: FormData, pageNo: number, pageSize: number) => {
      const payload: GetChapterListRequest = {
        storyId: storyId as string,
        chapterName: formData.chapterName || "",
        status: formData.status || "",
        pageIndex: pageNo,
        pageSize,
      };
      console.log("payload", payload);

      try {
        setIsSubmitting(true);
        const response: GetChapterListResponse =
          await chapterApi.getChapterList(payload);
        setResults(response.data);
        setTotalCount(response.totalRecord);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  useEffect(() => {
    handleSubmit((data) => fetchData(data, 1, pageSize))();
  }, [handleSubmit, fetchData, pageSize]);

  const onSubmit = (data: FormData) => {
    fetchData(data, currentPage, pageSize);
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

  const handleReCrawl = (chapterId: string) => {
    console.log("handleConfirmCrawl", chapterId);
    const data: ModalData = {
      onConfirm: async () => {
        console.log("onSubmitted", chapterId);
        setIsSubmitting(true);
        try {
          await chapterApi.reCrawlChapter(chapterId);
          handleSubmit((data) => fetchData(data, 1, pageSize))();
        } catch (error) {
          console.error("reCrawlChapter", error);
        } finally {
          setIsSubmitting(false);
          closeModal();
        }
      },
    };
    openModal("crawl-chapter", data);
  };

  const handleDelete = (chapterId: string) => {
    console.log("handleConfirmDelete", chapterId);
    const data: ModalData = {
      onConfirm: async () => {
        console.log("onSubmitted", chapterId);
        setIsSubmitting(true);
        try {
          await chapterApi.deleteChapter(chapterId);
          handleSubmit((data) => fetchData(data, 1, pageSize))();
        } catch (error) {
          console.error("deleteChapter", error);
        } finally {
          setIsSubmitting(false);
          closeModal();
        }
      },
    };
    openModal("delete-chapter", data);
  };

  if (!detail || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BreadCrumb>
        <BreadcrumbItem pageName="Danh sách truyện" path="/story" />
        <BreadcrumbItem pageName="Danh sách chương truyện" path="#" />
      </BreadCrumb>
      <DetailForm>
        <CollapsibleCard title="Thông tin truyện">
          <div className="grid grid-cols-1">
            <div className="space-y-4">
              <InputDetail label="Tên truyện" value={detail.storyName || ""} />
              <InputDetail
                label="Số chương"
                value={detail.chapterNumber || ""}
              />
            </div>
          </div>
        </CollapsibleCard>
      </DetailForm>

      <SearchForm>
        <Controller
          name="chapterName"
          control={control}
          render={() => (
            <Input
              label="Tên chương truyện"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập tên chương truyện"
              value={watch("chapterName")}
              onChange={(e) => setValue("chapterName", e.target.value)}
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
            isLoading={isSubmitting}
          >
            Tìm kiếm
          </FooterButton>
        </FooterButtons>
      </Footer>
      <TableList>
        <TableChapter
          currentPage={currentPage}
          loading={isLoading}
          pageSize={pageSize}
          totalCount={totalCount}
          data={results}
          onChangePage={handleOnChangePage}
          onChangeRowsPerPage={handleOnChangeRowsPerPage}
          handleReCrawl={handleReCrawl}
          handleDelete={handleDelete}
        />
      </TableList>
    </>
  );
};

export default ChaptersPage;
