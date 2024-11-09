"use client";

import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import React from "react";
import { storyApi } from "../../../../../../api-client/story-api";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Loader from "@/components/commons/Loader";
import InputDetail from "@/components/ui/Input/InputDetail";
import { convertDateFormat, formatDateTime } from "@utils/dateUtils";

const fetcher = async (id: string) => {
  const response = await storyApi.getDetail(id);
  return response;
};

const StoryDetailPage = () => {
  const params = useParams();
  let { storyId } = params;

  if (Array.isArray(storyId)) {
    storyId = storyId[0];
  }

  const { data: detail, isLoading } = useSWR(
    ["/admin/story/getById", storyId ? ["storyId", storyId] : null],
    () => fetcher(storyId || ""),
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
        <BreadcrumbItem pageName="Danh sách truyện" path="/story" />
        <BreadcrumbItem pageName="Chi tiết truyện" path="#" />
      </BreadCrumb>
      <div className="relative space-y-4 rounded-xl bg-white p-4 dark:bg-black">
        <div className="flex items-center gap-4">
          <label className=" text-sm text-neutral-600 dark:text-white whitespace-nowrap">
            Tên truyện:
          </label>
          <div className={`font-semibold text-sm`}>
            {detail.storyName || ""}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="space-y-4">
            <InputDetail label="Tác giả" value={detail.storyAuthor || ""} />
            <InputDetail
              label="Số lượng chương"
              value={detail.chapterNumber || ""}
            />
            <InputDetail
              label="Trạng thái"
              value={detail.status === "1" ? "Hoạt động" : "Không hoạt động"}
            />
            <InputDetail
              label="Trạng thái truyện"
              value={detail.storyStatus || ""}
            />
            <InputDetail label="Lượt xem" value={detail.viewNumber || ""} />
            <InputDetail
              label="Thứ tự hiển thị"
              value={detail.displayOrder || ""}
            />
            <div className="flex items-center gap-4">
              {/* Thêm lớp whitespace-nowrap để ngăn nhãn xuống dòng */}
              <label className="basis-1/3 text-sm text-neutral-600 dark:text-white whitespace-nowrap">
                Ảnh truyện
              </label>
              <div className={`basis-2/3 text-sm font-semibold`}>
                {detail.urlAvatar ? (
                  <img
                    src="https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=2608&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Ảnh truyện"
                    className="w-40 h-40 object-cover rounded"
                  />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    {detail.urlAvatar || "Không có ảnh"}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <InputDetail
              label="Is Hot"
              value={
                detail.isHot ? (detail.isHot === "1" ? "True" : "False") : ""
              }
            />
            <InputDetail
              label="Is Top Focus"
              value={
                detail.isTopFocus
                  ? detail.isTopFocus === "1"
                    ? "True"
                    : "False"
                  : ""
              }
            />
            <InputDetail label="Lượt like" value={detail.likeCount || "0"} />
            <InputDetail
              label="Alias name"
              value={detail.storyNameAlias || ""}
            />
            <InputDetail label="Danh mục" value={detail.catCodeRef || ""} />
            <InputDetail
              label="Ngày phát hành"
              value={convertDateFormat(detail.publishedDate) || ""}
            />
          </div>
        </div>
        {/* Đường Kẻ Ngang Phân Cách */}
        <hr className="my-6 border-gray-300 dark:border-gray-700" />

        {/* Tóm Tắt Truyện */}
        <div className="space-y-2 mt-5">
          <h2 className="text-sm text-neutral-600 dark:text-white whitespace-nowrap">
            Tóm tắt truyện
          </h2>
          <div
            className="prose max-w-none text-gray-600 dark:text-gray-300 mt-20"
            dangerouslySetInnerHTML={{ __html: detail.storySummary || "" }}
          />
        </div>
        <hr className="my-6 border-gray-300 dark:border-gray-700" />
        <div className="grid grid-cols-2">
          <div className="space-y-4">
            <InputDetail label="Người tạo" value={detail.createdBy || ""} />
            <InputDetail label="Người sửa" value={detail.modifiedBy || ""} />
          </div>
          <div className="space-y-4">
            <InputDetail
              label="Thời gian tạo"
              value={
                detail.createdDate ? formatDateTime(detail.createdDate) : ""
              }
            />
            <InputDetail
              label="Thời gian sửa"
              value={
                detail.modifiedDate ? formatDateTime(detail.modifiedDate) : ""
              }
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className=" text-sm text-neutral-600 dark:text-white whitespace-nowrap">
            Link gốc:
          </label>
          <div className={`text-sm`}>{detail?.urlOriginCrawl || ""}</div>
        </div>
      </div>
    </>
  );
};

export default StoryDetailPage;
