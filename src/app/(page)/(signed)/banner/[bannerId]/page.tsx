"use client";

import Loader from "@/components/commons/Loader";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import InputDetail from "@/components/ui/Input/InputDetail";
import { bannerApi } from "@apiClient/banner-api";
import { formatDateTime } from "@utils/dateUtils";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = async (id: string) => {
  const response = await bannerApi.getBannerDetail(id);
  return response;
};

const BannerDetailPage = () => {
  const params = useParams();
  const { bannerId } = params;

  const { data: detail, isLoading } = useSWR(
    ["/admin/banner/getById", bannerId ? ["bannerId", bannerId] : null],
    () => fetcher((bannerId as string) || ""),
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
        <BreadcrumbItem pageName="Danh sách banner" path="/banner" />
        <BreadcrumbItem pageName="Chi tiết banner" path="#" />
      </BreadCrumb>
      <div className="relative space-y-4 rounded-xl bg-white p-4 dark:bg-black">
        <div className="grid grid-cols-2">
          <div className="space-y-4">
            <InputDetail
              label="Tên banner"
              value={detail?.data?.bannerName || ""}
            />
            <InputDetail
              label="Vị trí banner"
              value={detail?.data?.bannerPos || ""}
            />
            <InputDetail label="Mô tả" value={detail?.data?.bannerDesc || ""} />
            <InputDetail label="Loại" value={detail?.data?.bannerType || ""} />
          </div>
          <div className="space-y-4">
            <InputDetail
              label="Banner page"
              value={detail?.data?.bannerPage || ""}
            />
            <InputDetail
              label="Trạng thái"
              value={detail?.data.status === "1" ? "Sử dụng" : "Không sử dụng"}
            />
            <InputDetail
              label="Link to"
              value={detail?.data?.bannerLinkTo || ""}
            />
            {detail?.data?.bannerUrl && (
              <div className="mt-4">
                <label className="text-sm text-neutral-600 dark:text-white">
                  Ảnh:
                </label>
                <img
                  src={detail.data.bannerUrl}
                  alt="Banner"
                  className="w-40 h-24 object-cover rounded"
                />
              </div>
            )}
          </div>
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
              value={detail?.data?.modifieddBy || ""}
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
      </div>
    </>
  );
};

export default BannerDetailPage;
