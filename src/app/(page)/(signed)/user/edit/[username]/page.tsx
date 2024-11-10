"use client";

import SearchForm from "@/components/commons/Form/SearchForm";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import { AddUserRequest, AddUserResponse } from "@/types/user";
import { userApi } from "@apiClient/user-api";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import SelectRole from "../../../(component)/SelectRole";
import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import useSWR from "swr";
import Loader from "@/components/commons/Loader";

const fetcher = async (id: string) => {
  const response = await userApi.getUserDetail(id);
  return response;
};

interface FormData {
  userName: string;
  email: string;
  password: string;
  roleId: string;
  status: string;
}

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const { username } = params;
  const [isSubmitting, setSubmitting] = useState(false);
  const { control, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      roleId: "",
      status: "1",
    },
  });

  const { data: detail, isLoading } = useSWR(
    ["/admin/user/get", username ? ["username", username] : null],
    () => fetcher((username as string) || ""),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (detail) {
      reset({
        userName: detail.data.userName,
        email: detail.data.email,
        roleId: detail.data.roleId.toString(),
        status: detail.data.status,
        password: "",
      });
    }
  }, [detail, reset]);

  const fetchData = useCallback(async (formData: FormData) => {
    const payload: AddUserRequest = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      roleId: formData.roleId,
      status: formData.status,
    };

    try {
      setSubmitting(true);
      const response: AddUserResponse = await userApi.editUser(payload);
      if (response.code === "00") {
        router.push("/user");
      }
    } catch (error) {
      console.error("Create user error:", error);
    } finally {
      setSubmitting(false);
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
        <BreadcrumbItem pageName="Danh sách user" path="/user"></BreadcrumbItem>
        <BreadcrumbItem pageName="Chỉnh sửa user" path="#" />
      </BreadCrumb>
      <SearchForm>
        <Controller
          name="userName"
          control={control}
          render={() => (
            <Input
              label="Username"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập username"
              value={watch("userName")}
              onChange={(e) => {
                setValue("userName", e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={() => (
            <Input
              label="Email"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập email"
              value={watch("email")}
              onChange={(e) => {
                setValue("email", e.target.value);
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
          name="roleId"
          control={control}
          render={() => (
            <SelectRole
              defaultValue={watch("roleId")}
              onChange={(value) => setValue("roleId", value)}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={() => (
            <Input
              label="Password"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập password"
              value={watch("password")}
              onChange={(e) => {
                setValue("password", e.target.value);
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

export default EditUserPage;
