"use client";

import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import SearchForm from "@/components/commons/Form/SearchForm";
import Loader from "@/components/commons/Loader";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import { UpdateBannerRequest, UpdateBannerResponse } from "@/types/banner";
import { bannerApi } from "@apiClient/banner-api";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";

const fetcher = async (id: string) => {
  const response = await bannerApi.getBannerDetail(id);
  return response;
};

interface FormData {
  bannerName: string;
  status: string;
  bannerType: "IMAGE" | "HTML";
  bannerDesc: string;
  bannerPos: string;
  bannerPage: string;
  bannerUrl: string;
  bannerLinkTo: string;
  bannerOpenType: "_self" | "_blank" | "_parent" | "_top";
  bannerHTML: string;
}

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

const typeOptions = [
  { label: "Hình ảnh", value: "IMAGE" },
  //   { label: "Html", value: "HTML" },
];

const posOptions = [
  { label: "Top", value: "TOP" },
  { label: "Bottom", value: "BOTTOM" },
];

const pageOptions = [
  { label: "Trang chủ", value: "HOME" },
  { label: "Danh mục", value: "CATEGORY" },
  { label: "Tag", value: "TAG" },
  { label: "Update", value: "UPDATE" },
];

const openTypeOptions = [{ label: "Mở trong cửa sổ mới", value: "_blank" }];

const BannerEditPage = () => {
  const params = useParams();
  const { bannerId } = params;

  const { data: detail, isLoading } = useSWR(
    ["/admin/banner/getById", bannerId ? ["bannerId", bannerId] : null],
    () => fetcher((bannerId as string) || ""),
    {
      revalidateOnFocus: false,
    }
  );

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      bannerName: "",
      status: "1",
      bannerType: "IMAGE",
      bannerDesc: "",
      bannerPos: "TOP",
      bannerPage: "HOME",
      bannerUrl: "",
      bannerLinkTo: "",
      bannerOpenType: "_blank",
      bannerHTML: "",
    },
  });

  useEffect(() => {
    if (detail) {
      reset({
        bannerName: detail.data.bannerName,
        status: detail.data.status,
        bannerType: detail.data.bannerType,
        bannerDesc: detail.data.bannerDesc,
        bannerPos: detail.data.bannerPos,
        bannerPage: detail.data.bannerPage,
        bannerUrl: detail.data.bannerUrl,
        bannerLinkTo: detail.data.bannerLinkTo,
        bannerOpenType: detail.data.bannerOpenType,
        bannerHTML: detail.data.bannerHTML,
      });
    }
  }, [detail, reset]);

  const fetchData = useCallback(async (formData: FormData) => {
    const payload: UpdateBannerRequest = {
      bannerId: bannerId as string,
      bannerName: formData.bannerName,
      status: formData.status,
      bannerType: formData.bannerType,
      bannerDesc: formData.bannerDesc,
      bannerPos: formData.bannerPos,
      bannerPage: formData.bannerPage,
      bannerUrl: formData.bannerUrl,
      bannerLinkTo: formData.bannerLinkTo,
      bannerOpenType: formData.bannerOpenType,
      bannerHTML: formData.bannerHTML,
    };

    try {
      setIsSubmitting(true);
      const response: UpdateBannerResponse = await bannerApi.updateBanner(
        bannerId as string,
        payload
      );
      if (response.code === "00") {
        router.push("/banner");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

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
        <BreadcrumbItem pageName="Danh sách banner" path="/banner" />
        <BreadcrumbItem pageName="Chỉnh sửa banner" path="#" />
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
              onChange={(e) => {
                setValue("bannerName", e.target.value);
              }}
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
              onSelect={(value) => {
                setValue("status", value);
              }}
            />
          )}
        />
        <Controller
          name="bannerType"
          control={control}
          render={() => (
            <Select
              title="Loại banner"
              label="Loại banner"
              options={typeOptions}
              value={watch("bannerType")}
              onSelect={(value) => {
                setValue("bannerType", value as "IMAGE" | "HTML");
              }}
            />
          )}
        />
        <Controller
          name="bannerDesc"
          control={control}
          render={() => (
            <Input
              label="Mô tả"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập mô tả"
              value={watch("bannerDesc")}
              onChange={(e) => {
                setValue("bannerDesc", e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="bannerPos"
          control={control}
          render={() => (
            <Select
              title="Vị trí"
              label="Vi trí"
              options={posOptions}
              value={watch("bannerPos")}
              onSelect={(value) => {
                setValue("bannerPos", value as "TOP" | "BOTTOM");
              }}
            />
          )}
        />
        <Controller
          name="bannerPage"
          control={control}
          render={() => (
            <Select
              title="Trang hiển thị"
              label="Trang hiển thị"
              options={pageOptions}
              value={watch("bannerPage")}
              onSelect={(value) => {
                setValue(
                  "bannerPage",
                  value as "HOME" | "CATEGORY" | "TAG" | "UPDATE"
                );
              }}
            />
          )}
        />
        <Controller
          name="bannerUrl"
          control={control}
          render={() => (
            <Input
              label="Link ảnh"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập link ảnh"
              value={watch("bannerUrl")}
              onChange={(e) => {
                setValue("bannerUrl", e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="bannerLinkTo"
          control={control}
          render={() => (
            <Input
              label="Link to"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập link to"
              value={watch("bannerLinkTo")}
              onChange={(e) => {
                setValue("bannerLinkTo", e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="bannerOpenType"
          control={control}
          render={() => (
            <Select
              title="Mở banner"
              label="Mở banner"
              options={openTypeOptions}
              value={watch("bannerOpenType")}
              onSelect={(value) => {
                setValue(
                  "bannerOpenType",
                  value as "_self" | "_blank" | "_parent" | "_top"
                );
              }}
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
        </FooterButtons>
      </Footer>
    </>
  );
};

export default BannerEditPage;
