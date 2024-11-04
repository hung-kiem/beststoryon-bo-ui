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
        <BreadcrumbItem pageName="Tìm kiếm" path="/category"></BreadcrumbItem>
        <BreadcrumbItem pageName="Chi tiết tìm kiếm" path="#"></BreadcrumbItem>
      </BreadCrumb>
      <div className="grid grow grid-cols-3 gap-4">
        <Input
          label="Mã danh mục"
          value={detail.data.catCode || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Tên danh mục"
          value={detail.data.catName || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Thứ tự"
          value={detail.data.displayOrder.toString() || ""}
          isReadOnly
          placeholder=""
        />
        <Input
          label="Origin Site"
          value={detail.data.originSite || ""}
          isReadOnly
          placeholder=""
        />
        <Select
          title="Trạng thái"
          label="Trạng thái"
          options={statusOptions}
          value={detail.data.status.toString() || ""}
          isDisabled
        />
      </div>
    </>
  );
};

export default CategoryDetail;
