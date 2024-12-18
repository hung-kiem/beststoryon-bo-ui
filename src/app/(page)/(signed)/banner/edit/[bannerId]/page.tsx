"use client";

import Loader from "@/components/commons/Loader";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import Button from "@/components/ui/Buttons/Button";
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
  bannerPos: string;
  bannerPage: string;
  bannerHTML: string;
  inputSource: string;
}

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

const posOptions = [
  { label: "All", value: "0" },
  { label: "Top", value: "1" },
  { label: "Middle", value: "2" },
  { label: "Bottom", value: "3" },
];

const pageOptions = [
  { label: "All", value: "ALL" },
  { label: "Home", value: "HOME" },
  { label: "Category", value: "CATEGORY" },
  { label: "Tag", value: "TAG" },
  { label: "Update", value: "UPDATE" },
  { label: "Trending", value: "TRENDING" },
  { label: "New Release", value: "NEW_RELEASE" },
  { label: "Hot", value: "HOT" },
  { label: "Author", value: "AUTHOR" },
  { label: "Chapter", value: "CHAPTER" },
];

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
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({});

  useEffect(() => {
    if (detail) {
      reset({
        bannerName: detail.data.bannerName,
        status: detail.data.status,
        bannerPos: detail.data.bannerPos,
        bannerPage: detail.data.bannerPage,
        bannerHTML: detail.data.bannerHTML,
        inputSource: detail.data.bannerDesc,
      });
    }
  }, [detail, reset]);

  useEffect(() => {
    if (detail) {
      setValue("status", detail.data.status);
      setValue("bannerPos", detail.data.bannerPos || "0");
      setValue("bannerPage", detail.data.bannerPage);
    }
  }, [detail, setValue]);

  const fetchData = useCallback(async (formData: FormData) => {
    const payload: UpdateBannerRequest = {
      bannerId: bannerId as string,
      bannerName: formData.bannerName,
      status: formData.status,
      bannerPos: formData.bannerPos,
      bannerPage: formData.bannerPage,
      bannerHTML: formData.bannerHTML,
      bannerType: "HTML",
      bannerDesc: formData.inputSource,
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
      {detail && (
        <div className="mb-4 flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black">
          <div
            className="grid grow grid-cols-1
                  gap-4
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4"
          >
            <Controller
              name="bannerName"
              control={control}
              render={({ field }) => (
                <Input
                  label="Tên banner"
                  layout="vertical"
                  className="w-full"
                  type="text"
                  placeholder="Nhập tên banner"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  key={field.value}
                  title="Trạng thái"
                  label="Trạng thái"
                  options={statusOptions}
                  value={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
            <Controller
              name="bannerPos"
              control={control}
              render={({ field }) => (
                <Select
                  key={field.value}
                  title="Vị trí"
                  label="Vi trí"
                  options={posOptions}
                  value={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
            <Controller
              name="bannerPage"
              control={control}
              render={({ field }) => (
                <Select
                  key={field.value}
                  title="Trang hiển thị"
                  label="Trang hiển thị"
                  options={pageOptions}
                  value={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
          </div>
          <div
            className="grid grow grid-cols-1
                  gap-4
                  sm:grid-cols-1
                  md:grid-cols-2
                  lg:grid-cols-2"
          >
            <Controller
              name="inputSource"
              control={control}
              rules={{
                maxLength: {
                  value: 250,
                  message: "Input source tối đa 250 ký tự.",
                },
              }}
              render={({ field }) => (
                <div>
                  <label className="mb-3 block text-sm text-neutral-600 dark:text-white">
                    Input source
                  </label>
                  <textarea
                    {...field}
                    value={watch("inputSource")}
                    onChange={(e) => setValue("inputSource", e.target.value)}
                    rows={12}
                    className=" w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                  {errors.inputSource && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.inputSource.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="bannerHTML"
              control={control}
              rules={{
                maxLength: {
                  value: 1000,
                  message: "Banner HTML tối đa 1000 ký tự.",
                },
              }}
              render={({ field }) => (
                <div>
                  <label className="mb-3 block text-sm text-neutral-600 dark:text-white">
                    HTML
                  </label>
                  <textarea
                    {...field}
                    value={watch("bannerHTML")}
                    onChange={(e) => setValue("bannerHTML", e.target.value)}
                    rows={12}
                    className=" w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                  {errors.bannerHTML && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bannerHTML.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="rounded-lg bg-white dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-wrap justify-center gap-5">
              <Button
                onClick={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                type="primary"
                size="large"
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BannerEditPage;
