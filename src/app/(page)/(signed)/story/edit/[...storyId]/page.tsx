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
import { convertDateFormat } from "../../../../../../../utils/dateUtils";
import { Controller, useForm } from "react-hook-form";
import { UpdateStoryRequest } from "@/types/story";
import { BaseResponse } from "@/types/baseResponse";
import Select from "@/components/ui/Select/Select";
import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";

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
}

const fetcher = async (id: string) => {
  const response = await storyApi.getDetail(id);
  return response;
};

const storyStatusOptions = [
  { label: "Đang phát hành", value: "Ongoing" },
  { label: "Đã kết thúc", value: "Completed" },
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
      storyStatus: "",
      isHot: "",
      isTopFocus: "",
      likeCount: 0,
      storyNameAlias: "",
      urlAvatar: "",
      urlOriginCrawl: "",
      viewNumber: 0,
      published: "",
      publishedDate: "",
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
      });
    }
  }, [detail, reset]);

  const fetchData = useCallback(
    async (formData: FormData) => {
      const payload: UpdateStoryRequest = {
        storyName: formData.storyName,
        storyAuthor: formData.storyAuthor,
        storyStatus: formData.storyStatus,
        storyNameAlias: formData.storyNameAlias,
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
      }
    },
    [storyId, router]
  );

  const onSubmit = (data: FormData) => {
    console.log(data);
    // fetchData(data);
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
      <SearchForm>
        <Controller
          name="storyName"
          control={control}
          render={() => (
            <Input
              label="Tên truyện"
              value={watch("storyName")}
              placeholder=""
              onChange={(e) => setValue("storyName", e.target.value)}
            />
          )}
        />
        <Controller
          name="storyAuthor"
          control={control}
          render={() => (
            <Input
              label="Tác giả"
              value={watch("storyAuthor")}
              placeholder=""
              onChange={(e) => setValue("storyAuthor", e.target.value)}
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
              value={watch("storyStatus") || "Ongoing"}
              onSelect={(value) => setValue("storyStatus", value)}
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
