"use client";

import Loader from "@/components/commons/Loader";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import InputDetail from "@/components/ui/Input/InputDetail";
import { chapterApi } from "@apiClient/chapter-api";
import { formatDateTime } from "@utils/dateUtils";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = async (id: string) => {
  const response = await chapterApi.getChapterDetail(id);
  return response;
};

const ChapterDetail = () => {
  const params = useParams();
  const { chapterId, storyId } = params;

  const { data: detail, isLoading } = useSWR(
    ["/admin/chapter/getById", chapterId ? ["chapterId", chapterId] : null],
    () => fetcher((chapterId as string) || ""),
    {
      revalidateOnFocus: false,
    }
  );
  if (!detail || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BreadCrumb>
        <BreadcrumbItem
          pageName="Danh sách chương"
          path={"/story/" + storyId + "/chapters"}
        />
        <BreadcrumbItem pageName="Chi tiết chương truyện" path="#" />
      </BreadCrumb>
      <div className="relative space-y-4 rounded-xl bg-white p-4 dark:bg-black">
        <div className="flex items-center gap-4">
          <label className=" text-sm text-neutral-600 dark:text-white whitespace-nowrap">
            Tên truyện:
          </label>
          <div className={`font-semibold text-sm`}>
            {detail?.data?.storyName || ""}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="space-y-4">
            <InputDetail
              label="Tên chương truyện"
              value={detail?.data?.chapterName || ""}
            />
            <InputDetail
              label="Trạng thái"
              value={detail?.data?.status === "1" ? "Sử dụng" : "Không sử dụng"}
            />
            <InputDetail
              label="Lượt view"
              value={detail?.data?.viewNumber || ""}
            />
          </div>
          <div className="space-y-4">
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
            <InputDetail
              label="Lượt like"
              value={detail?.data?.likeCount || ""}
            />
          </div>
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
          <div className={`text-sm`}>{detail?.data?.urlOriginCrawl || ""}</div>
        </div>
      </div>
    </>
  );
};

export default ChapterDetail;
