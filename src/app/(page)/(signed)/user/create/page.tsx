"use client";

import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import SearchForm from "@/components/commons/Form/SearchForm";
import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import { AddUserRequest, AddUserResponse } from "@/types/user";
import { roleApi } from "@apiClient/role-api";
import { userApi } from "@apiClient/user-api";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import SelectRole from "../../(component)/SelectRole";

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

const fetcher = async () => {
  const response = await roleApi.getRoles();
  return response;
};

const CreateUserPage = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      roleId: "",
      status: "1",
    },
  });

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
      const response: AddUserResponse = await userApi.addUser(payload);
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
  return (
    <>
      <BreadCrumb>
        <BreadcrumbItem pageName="Danh sách user" path="/user"></BreadcrumbItem>
        <BreadcrumbItem pageName="Thêm mới user" path="#" />
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

export default CreateUserPage;
