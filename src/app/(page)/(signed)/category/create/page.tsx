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
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      status: "1",
      catName: "",
      catCode: "",
      displayOrder: 99,
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
        <BreadcrumbItem
          pageName="Danh sách danh mục"
          path="/category"
        ></BreadcrumbItem>
        <BreadcrumbItem pageName="Thêm mới danh mục" path="#" />
      </BreadCrumb>
      <SearchForm>
        <Controller
          name="catCode"
          control={control}
          render={() => (
            <Input
              label="Mã danh mục"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập mã danh mục"
              value={watch("catCode")}
              onChange={(e) => {
                setValue("catCode", e.target.value);
              }}
            />
          )}
        />
        <Controller
          name="catName"
          control={control}
          render={() => (
            <Input
              label="Tên danh mục"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập tên danh mục"
              value={watch("catName")}
              onChange={(e) => {
                setValue("catName", e.target.value);
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
          name="displayOrder"
          control={control}
          render={() => (
            <Input
              label="Thứ tự hiển thị"
              layout="vertical"
              className="w-full"
              type="number"
              placeholder="Nhập thứ tự hiển thị"
              value={watch("displayOrder")}
              onChange={(e) => {
                setValue("displayOrder", Number(e.target.value));
              }}
            />
          )}
        />
        <Controller
          name="originSite"
          control={control}
          render={() => (
            <Input
              label="Nguồn"
              layout="vertical"
              className="w-full"
              type="text"
              placeholder="Nhập nguồn"
              value={watch("originSite")}
              onChange={(e) => {
                setValue("originSite", e.target.value);
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
