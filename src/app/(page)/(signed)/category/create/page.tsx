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
import { BaseResponse } from "@/types/baseResponse";
import { CreateCategoryRequest } from "@/types/category";
import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { categoryApi } from "../../../../../../api-client/category-api";
import { useRouter } from "next/navigation";

interface FormData {
  status: string;
  catName: string;
  catCode: string;
  displayOrder: number;
  originSite: string;
}

const statusOptions = [
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];

const CreateCategory = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      status: "1",
      catName: "",
      catCode: "",
      displayOrder: 0,
      originSite: "",
    },
  });
  const fetchData = useCallback(async (formData: FormData) => {
    const payload: CreateCategoryRequest = {
      catCode: formData.catCode,
      cateName: formData.catName,
      status: formData.status,
      displayOrder: formData.displayOrder,
      originSite: formData.originSite,
    };
    console.log("payload", payload);

    try {
      setIsLoading(true);
      const response: BaseResponse = await categoryApi.create(payload);
      if (response.code === "00") {
        router.push("/category");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onSubmit = (data: FormData) => {
    console.log(data);
    fetchData(data);
  };

  return (
    <>
      <BreadCrumb>
        <BreadcrumbItem pageName="Thêm mới danh mục" path="#" />
      </BreadCrumb>
      <SearchForm>
        <Controller
          name="catCode"
          control={control}
          render={({ field }) => (
            <Input
              label="Mã danh mục"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập mã danh mục"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                console.log("catCode changed:", e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="catName"
          control={control}
          render={({ field }) => (
            <Input
              label="Tên danh mục"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập tên danh mục"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                console.log("catName changed:", e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              title="Trạng thái"
              label="Trạng thái"
              options={statusOptions}
              {...field}
              onSelect={(value) => {
                field.onChange(value);
                console.log("status changed:", value);
              }}
            />
          )}
        />
        <Controller
          name="displayOrder"
          control={control}
          render={({ field }) => (
            <Input
              label="Thứ tự hiển thị"
              layout="vertical"
              className="w-full"
              type="number"
              placeholder="Nhập thứ tự hiển thị"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                console.log("displayOrder changed:", e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="originSite"
          control={control}
          render={({ field }) => (
            <Input
              label="Nguồn"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập nguồn"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                console.log("originSite changed:", e.target.value);
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
            isLoading={isLoading}
          >
            Lưu
          </FooterButton>
        </FooterButtons>
      </Footer>
    </>
  );
};

export default CreateCategory;
