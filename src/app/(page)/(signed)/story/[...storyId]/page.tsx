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
      <SearchForm>
        <Input
          label="Tác giả"
          value={detail.storyAuthor || ""}
          isReadOnly
          placeholder=""
        />{" "}
        <Input
          label="Số lượng chương"
          value={detail.chapterNumber || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Trạng thái"
          value={detail.status === "1" ? "Hoạt động" : "Không hoạt động"}
          isReadOnly
          placeholder=""
        />{" "}
        <Input
          label="Trạng thái truyện"
          value={detail.storyStatus || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Truyện nổi bật"
          value={detail.isHot ? (detail.isHot === "1" ? "Có" : "Không") : ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Truyện ưu tiên"
          value={
            detail.isTopFocus
              ? detail.isTopFocus === "1"
                ? "Có"
                : "Không"
              : ""
          }
          isReadOnly
          placeholder=""
        />
        <Input
          label="Lượt like"
          value={detail.likeCount || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Alias name"
          value={detail.storyNameAlias || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Link ảnh bìa"
          value={detail.urlAvatar || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Link nguồn"
          value={detail.urlOriginCrawl || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Lượt xem"
          value={detail.viewNumber || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Trạng thái phát hành"
          value={detail.published || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Ngày phát hành"
          value={convertDateFormat(detail.publishedDate) || ""}
          isReadOnly
          placeholder=""
        />
      </SearchForm>
    </>
  );
};

export default StoryDetailPage;
