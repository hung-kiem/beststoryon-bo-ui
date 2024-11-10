"use client";

import DetailForm from "@/components/commons/Form/DetailForm";
import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import SearchForm from "@/components/commons/Form/SearchForm";
import Loader from "@/components/commons/Loader";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import CollapsibleCard from "@/components/ui/CollapsibleCard/CollapsibleCard";
import Input from "@/components/ui/Input/Input";
import InputDetail from "@/components/ui/Input/InputDetail";
import { closeModal, ModalData, openModal } from "@/components/ui/Modal";
import Select from "@/components/ui/Select/Select";
import { BaseResponse } from "@/types/baseResponse";
import { UpdateChapterRequest } from "@/types/chapter";
import { chapterApi } from "@apiClient/chapter-api";
import { formatDateTime } from "@utils/dateUtils";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";

const fetcher = async (id: string) => {
  const response = await chapterApi.getChapterDetail(id);
  return response;
};

interface FormData {
  chapterName: string;
  status: string;
  likeCount: number;
  viewNumber: number;
}

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

const ChapterEdit = () => {
  const params = useParams();
  const { chapterId, storyId } = params;
  const router = useRouter();

  const { data: detail, isLoading } = useSWR(
    ["/admin/chapter/getById", chapterId ? ["chapterId", chapterId] : null],
    () => fetcher((chapterId as string) || ""),
    {
      revalidateOnFocus: false,
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, reset, watch, setValue } = useForm<FormData>({
    defaultValues: {
      chapterName: "",
      status: "",
      likeCount: 0,
      viewNumber: 0,
    },
  });

  useEffect(() => {
    if (detail) {
      console.log("detail", detail);
      reset({
        chapterName: detail?.data?.chapterName || "",
        status: detail?.data?.status || "",
        likeCount: detail?.data?.likeCount || 0,
        viewNumber: detail?.data?.viewNumber || 0,
      });
    }
  }, [detail, reset]);

  const fetchData = useCallback(
    async (formData: FormData) => {
      const payload: UpdateChapterRequest = {
        chapterName: formData.chapterName,
        status: formData.status,
        likeCount: formData.likeCount,
        viewNumber: formData.viewNumber,
      };
      console.log("payload", payload);

      try {
        setIsSubmitting(true);
        const response: boolean = await chapterApi.updateChapter(
          (chapterId as string) || "",
          payload
        );
        if (response) {
          router.push("/story/" + storyId + "/chapters");
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSubmitting(false);
        router.push("/story");
      }
    },
    [storyId, router]
  );

  const onSubmit = (data: FormData) => {
    console.log(data);
    fetchData(data);
  };

  const handleConfirmCrawl = (chapterId: string) => {
    console.log("handleConfirmCrawl", chapterId);
    const data: ModalData = {
      onConfirm: async () => {
        console.log("onSubmitted", chapterId);
        setIsSubmitting(true);
        try {
          await chapterApi.reCrawlChapter(chapterId);
          router.push(`/story/${storyId}/chapters`);
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

  const handleConfirmDelete = (chapterId: string) => {
    console.log("handleConfirmDelete", chapterId);
    const data: ModalData = {
      onConfirm: async () => {
        console.log("onSubmitted", chapterId);
        setIsSubmitting(true);
        try {
          await chapterApi.deleteChapter(chapterId);
          router.push(`/story/${storyId}/chapters`);
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
        <BreadcrumbItem
          pageName="Danh sách chương truyện"
          path={"/story/" + storyId + "/chapters"}
        />
        <BreadcrumbItem pageName="Chỉnh sửa chương" path="#" />
      </BreadCrumb>
      <DetailForm>
        <CollapsibleCard title="Thông tin chương" defaultOpen={false}>
          <div className="space-y-4">
            <InputDetail
              label="Tên truyện"
              value={detail?.data?.storyName || ""}
            />
            <InputDetail
              label="Chương số"
              value={
                detail?.data?.chapterNumber
                  ? detail?.data?.chapterNumber
                  : detail?.data?.chapterIndex || ""
              }
            />
            <InputDetail
              label="Tổng số chương"
              value={detail?.totalChapter || ""}
            />
          </div>

          <hr className="my-6 border-gray-300 dark:border-gray-700" />
          <div className="space-y-2 mt-5">
            <h2 className="text-sm text-neutral-600 dark:text-white whitespace-nowrap">
              Tóm tắt truyện
            </h2>
            <div
              className="prose max-w-none text-gray-600 dark:text-gray-300 mt-20"
              dangerouslySetInnerHTML={{
                __html: detail?.data?.chapterContent || "",
              }}
            />
          </div>
          <hr className="my-6 border-gray-300 dark:border-gray-700" />
          <div className="grid grid-cols-2">
            <div className="space-y-4">
              <InputDetail
                label="Người tạo"
                value={detail?.data?.createdBy || ""}
              />
              <InputDetail
                label="Người sửa"
                value={detail?.data?.modifiedBy || ""}
              />
            </div>
            <div className="space-y-4">
              <InputDetail
                label="Thời gian tạo"
                value={
                  detail?.data?.createdDate
                    ? formatDateTime(detail?.data?.createdDate)
                    : ""
                }
              />
              <InputDetail
                label="Thời gian sửa"
                value={
                  detail?.data?.modifiedDate
                    ? formatDateTime(detail?.data?.modifiedDate)
                    : ""
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className=" text-sm text-neutral-600 dark:text-white whitespace-nowrap">
              Link gốc:
            </label>
            <div className={`text-sm`}>
              {detail?.data?.urlOriginCrawl || ""}
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
              label="Tên chương"
              type="text"
              value={watch("chapterName")}
              onChange={(e) => setValue("chapterName", e.target.value)}
              className="w-full"
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
        <Controller
          name="viewNumber"
          control={control}
          render={() => (
            <Input
              label="Lượt view"
              type="number"
              value={watch("viewNumber")}
              onChange={(e) => setValue("viewNumber", Number(e.target.value))}
              className="w-full"
            />
          )}
        />
        <Controller
          name="likeCount"
          control={control}
          render={() => (
            <Input
              label="Lượt like"
              type="number"
              value={watch("likeCount")}
              onChange={(e) => setValue("likeCount", Number(e.target.value))}
              className="w-full"
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
            Lưu
          </FooterButton>
          <FooterButton
            type="outline"
            onClick={() => handleConfirmCrawl(chapterId as string)}
            isLoading={isSubmitting}
          >
            Thực hiện lấy dữ liệu
          </FooterButton>
          <FooterButton
            type="black"
            onClick={() => handleConfirmDelete(chapterId as string)}
            isLoading={isSubmitting}
          >
            Xóa
          </FooterButton>
        </FooterButtons>
      </Footer>
    </>
  );
};

export default ChapterEdit;
