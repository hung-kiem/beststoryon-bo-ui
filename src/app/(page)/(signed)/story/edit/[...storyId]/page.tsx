"use client";

import SearchForm from "@/components/commons/Form/SearchForm";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import Loader from "@/components/commons/Loader";
import Input from "@/components/ui/Input/Input";
import { storyApi } from "../../../../../../../api-client/story-api";
import {
  convertDateFormat,
  formatDateTime,
} from "../../../../../../../utils/dateUtils";
import { Controller, useForm } from "react-hook-form";
import { UpdateStoryRequest } from "@/types/story";
import { BaseResponse } from "@/types/baseResponse";
import Select from "@/components/ui/Select/Select";
import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import DetailForm from "@/components/commons/Form/DetailForm";
import CollapsibleCard from "@/components/ui/CollapsibleCard/CollapsibleCard";
import InputDetail from "@/components/ui/Input/InputDetail";

interface FormData {
  storyName: string;
  storyAuthor: string;
  chapterNumber: number;
  status: string;
  storyStatus: string;
  isHot: string;
  isTopFocus: string;
  likeCount: number;
  storyNameAlias: string;
  urlAvatar: string;
  urlOriginCrawl: string;
  viewNumber: number;
  published: string;
  publishedDate: string;
  displayOrder: number;
}

const fetcher = async (id: string) => {
  const response = await storyApi.getDetail(id);
  return response;
};

const storyStatusOptions = [
  { label: "Đang phát hành", value: "Ongoing" },
  { label: "Đã kết thúc", value: "Completed" },
];

const storyPublishOptions = [
  { label: "Đang phát hành", value: "1" },
  { label: "Chưa phát hành", value: "0" },
];

const statusOptions = [
  { label: "Có", value: "1" },
  { label: "Không", value: "0" },
];

const StoryDetailPage = () => {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const params = useParams();
  const storyId = Array.isArray(params.storyId)
    ? params.storyId[0]
    : params.storyId;

  const { data: detail, isLoading } = useSWR(
    ["/admin/story/getById", storyId ? ["storyId", storyId] : null],
    () => fetcher(storyId || ""),
    {
      revalidateOnFocus: false,
    }
  );

  const { control, handleSubmit, reset, watch, setValue } = useForm<FormData>({
    defaultValues: {
      storyName: "",
      storyAuthor: "",
      chapterNumber: 0,
      status: "",
      storyStatus: "Ongoing",
      isHot: "",
      isTopFocus: "",
      likeCount: 0,
      storyNameAlias: "",
      urlAvatar: "",
      urlOriginCrawl: "",
      viewNumber: 0,
      published: "",
      publishedDate: "",
      displayOrder: 0,
    },
  });

  useEffect(() => {
    if (detail) {
      console.log("detail", detail);
      reset({
        storyName: detail.storyName || "",
        storyAuthor: detail.storyAuthor || "",
        chapterNumber: detail.chapterNumber || 0,
        status: detail.status || "",
        storyStatus: detail.storyStatus || "",
        isHot: detail.isHot || "",
        isTopFocus: detail.isTopFocus || "",
        likeCount: detail.likeCount || 0,
        storyNameAlias: detail.storyNameAlias || "",
        urlAvatar: detail.urlAvatar || "",
        urlOriginCrawl: detail.urlOriginCrawl || "",
        viewNumber: detail.viewNumber || 0,
        published: detail.published || "",
        publishedDate: detail.publishedDate
          ? convertDateFormat(detail.publishedDate)
          : "",
        displayOrder: detail.displayOrder || 0,
      });
    }
  }, [detail, reset]);

  const fetchData = useCallback(
    async (formData: FormData) => {
      const payload: UpdateStoryRequest = {
        storyNameAlias: formData.storyNameAlias,
        storyStatus: formData.storyStatus,
        isHot: formData.isHot,
        isTopFocus: formData.isTopFocus,
        viewNumber: formData.viewNumber,
        likeCount: formData.likeCount,
        published: formData.published,
        storyName: formData.storyName,
        displayOrder: formData.displayOrder,
      };
      console.log("payload", payload);

      try {
        setIsSubmit(true);
        const response: BaseResponse = await storyApi.edit(
          storyId || "",
          payload
        );
        if (response.code === "00") {
          router.push("/story");
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSubmit(false);
        router.push("/story");
      }
    },
    [storyId, router]
  );

  const onSubmit = (data: FormData) => {
    console.log(data);
    fetchData(data);
  };

  if (!detail || isLoading) {
    return <Loader />;
  }
  return (
    <>
      <BreadCrumb>
        <BreadcrumbItem pageName="Danh sách truyện" path="/story" />
        <BreadcrumbItem pageName="Chỉnh sửa truyện" path="#" />
      </BreadCrumb>
      <DetailForm>
        <CollapsibleCard title="Thông tin truyện" defaultOpen={false}>
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
          <InputDetail
            label="Link gốc"
            value={detail.urlOriginCrawl || ""}
            isBold={false}
          />
        </CollapsibleCard>
      </DetailForm>

      <SearchForm>
        <Controller
          name="storyName"
          control={control}
          render={() => (
            <Input
              label="Tên truyện"
              type="text"
              value={watch("storyName")}
              onChange={(e) => setValue("storyName", e.target.value)}
              className="w-full"
            />
          )}
        />
        <Controller
          name="storyStatus"
          control={control}
          render={() => (
            <Select
              title="Trạng thái truyện"
              label="Trạng thái truyện"
              options={storyStatusOptions}
              value={watch("storyStatus")}
              onSelect={(value) => setValue("storyStatus", value)}
            />
          )}
        />
        <Controller
          name="published"
          control={control}
          render={() => (
            <Select
              title="Trạng thái phát hành"
              label="Trạng thái phát hành"
              options={storyPublishOptions}
              value={watch("published")}
              onSelect={(value) => setValue("published", value)}
            />
          )}
        />
        <Controller
          name="isHot"
          control={control}
          render={() => (
            <Select
              title="Truyện nổi bật"
              label="Truyện nổi bật"
              options={statusOptions}
              value={watch("isHot")}
              onSelect={(value) => setValue("isHot", value)}
            />
          )}
        />
        <Controller
          name="isTopFocus"
          control={control}
          render={() => (
            <Select
              title="Truyện ưu tiên"
              label="Truyện ưu tiên"
              options={statusOptions}
              value={watch("isTopFocus")}
              onSelect={(value) => setValue("isTopFocus", value)}
            />
          )}
        />
        <Controller
          name="viewNumber"
          control={control}
          render={() => (
            <Input
              label="Lượt xem"
              type="number"
              className="w-full"
              value={watch("viewNumber")}
              onChange={(e) => setValue("viewNumber", Number(e.target.value))}
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
              className="w-full"
              value={watch("likeCount")}
              onChange={(e) => setValue("likeCount", Number(e.target.value))}
            />
          )}
        />
        <Controller
          name="storyNameAlias"
          control={control}
          render={() => (
            <Input
              label="Alias name"
              type="text"
              className="w-full"
              value={watch("storyNameAlias")}
              onChange={(e) => setValue("storyNameAlias", e.target.value)}
            />
          )}
        />
        <Controller
          name="displayOrder"
          control={control}
          render={() => (
            <Input
              label="Thứ tự hiển thị"
              type="text"
              className="w-full"
              value={watch("displayOrder")}
              onChange={(e) => setValue("displayOrder", Number(e.target.value))}
            />
          )}
        />
      </SearchForm>
      <Footer>
        <FooterButtons>
          <FooterButton
            type="primary"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmit}
          >
            Lưu
          </FooterButton>
        </FooterButtons>
      </Footer>
    </>
  );
};

export default StoryDetailPage;
