"use client";

import Loader from "@/components/commons/Loader";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import InputDetail from "@/components/ui/Input/InputDetail";
import { userApi } from "@apiClient/user-api";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = async (id: string) => {
  const response = await userApi.getUserDetail(id);
  return response;
};

const UserDetailPage = () => {
  const params = useParams();
  let { username } = params;

  if (Array.isArray(username)) {
    username = username[0];
  }

  const { data: detail, isLoading } = useSWR(
    ["/admin/story/getById", username ? ["username", username] : null],
    () => fetcher(username || ""),
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
        <BreadcrumbItem pageName="Danh sách user" path="/user" />
        <BreadcrumbItem pageName="Chi tiết user" path="#" />
      </BreadCrumb>
      <div className="relative space-y-4 rounded-xl bg-white p-4 dark:bg-black">
        <div className="grid grid-cols-2">
          <div className="space-y-4">
            <InputDetail label="Username" value={detail.data.userName || ""} />
            <InputDetail
              label="Trạng thái"
              value={
                detail.data.status === "1" ? "Hoạt động" : "Không hoạt động"
              }
            />
          </div>
          <div className="space-y-4">
            <InputDetail
              label="Nhóm quyền"
              value={detail.data.roleName || ""}
            />
            <InputDetail label="Email" value={detail.data.email || ""} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPage;
