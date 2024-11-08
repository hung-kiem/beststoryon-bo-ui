"use client";

import React from "react";
import { categoryApi } from "../../../../../../api-client/category-api";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Loader from "@/components/commons/Loader";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import DetailForm from "@/components/commons/Form/DetailForm";
import InputDetail from "@/components/ui/Input/InputDetail";
import { formatDateTime } from "../../../../../../utils/dateUtils";

const fetcher = async (id: string) => {
  const response = await categoryApi.getDetail(id);
  return response;
};

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

const CategoryDetail = () => {
  const params = useParams();
  let { catId } = params;

  if (Array.isArray(catId)) {
    catId = catId[0];
  }

  const { data: detail, isLoading } = useSWR(
    ["/admin/cat/getById", catId ? ["catId", catId] : null],
    () => fetcher(catId || ""),
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
          pageName="Danh sách danh mục"
          path="/category"
        ></BreadcrumbItem>
        <BreadcrumbItem pageName="Chi tiết danh mục" path="#"></BreadcrumbItem>
      </BreadCrumb>
      <div className="relative space-y-4 rounded-xl bg-white p-4 dark:bg-black">
        <div className="grid grid-cols-2">
          <div className="space-y-4">
            <InputDetail
              label="Mã danh mục"
              value={detail.data.catCode || ""}
            />
            <InputDetail
              label="Tên danh mục"
              value={detail.data.catName || ""}
            />
            <InputDetail
              label="Người tạo"
              value={detail.data.createdBy || ""}
            />
            <InputDetail
              label="Người sửa"
              value={detail.data.modifiedBy || ""}
            />
            <InputDetail
              label="Link gốc"
              value={detail.data.originSite || ""}
            />
          </div>
          <div className="space-y-4">
            <InputDetail
              label="Thứ tự hiển thị"
              value={detail.data.displayOrder.toString() || ""}
            />
            <InputDetail
              label="Trạng thái"
              value={detail.data.status === "1" ? "Sử dụng" : "Không sử dụng"}
            />
            <InputDetail
              label="Ngày tạo"
              value={
                detail.data.createdDate
                  ? formatDateTime(detail.data.createdDate)
                  : ""
              }
            />
            <InputDetail
              label="Ngày sửa"
              value={
                detail.data.modifiedDate
                  ? formatDateTime(detail.data.modifiedDate)
                  : ""
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDetail;
