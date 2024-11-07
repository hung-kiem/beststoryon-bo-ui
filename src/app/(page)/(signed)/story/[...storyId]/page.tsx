"use client";

import SearchForm from "@/components/commons/Form/SearchForm";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import React from "react";
import { storyApi } from "../../../../../../api-client/story-api";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Loader from "@/components/commons/Loader";
import Input from "@/components/ui/Input/Input";
import { convertDateFormat } from "../../../../../../utils/dateUtils";
import { Controller } from "react-hook-form";
import InputDetail from "@/components/ui/Input/InputDetail";

const fetcher = async (id: string) => {
  const response = await storyApi.getDetail(id);
  return response;
};

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

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
        <InputDetail label="Tên truyện" value={detail.storyName || ""} />
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
          </div>
          <div className="space-y-4">
            <InputDetail
              label="Truyện nổi bật"
              value={
                detail.isHot ? (detail.isHot === "1" ? "Có" : "Không") : ""
              }
            />
            <InputDetail
              label="Truyện ưu tiên"
              value={
                detail.isTopFocus
                  ? detail.isTopFocus === "1"
                    ? "Có"
                    : "Không"
                  : ""
              }
            />
            <InputDetail label="Lượt like" value={detail.likeCount || ""} />
            <InputDetail
              label="Alias name"
              value={detail.storyNameAlias || ""}
            />
            <InputDetail
              label="Trạng thái phát hành"
              value={
                detail.published === "1" ? "Đã phát hành" : "Chưa phát hành"
              }
            />
            <InputDetail
              label="Ngày phát hành"
              value={convertDateFormat(detail.publishedDate) || ""}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryDetailPage;
