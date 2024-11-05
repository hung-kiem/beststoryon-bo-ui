"use client";

import BreadCrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "@/components/ui/Breadcrumb/BreadcrumbItem";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { categoryApi } from "../../../../../../../api-client/category-api";
import Loader from "@/components/commons/Loader";
import { Controller, useForm } from "react-hook-form";
import Footer, {
  FooterButton,
  FooterButtons,
} from "@/components/commons/Form/SearchFooter";
import SearchForm from "@/components/commons/Form/SearchForm";
import { UpdateCategoryRequest } from "@/types/category";
import { BaseResponse } from "@/types/baseResponse";

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

const fetcher = async (id: string) => {
  const response = await categoryApi.getDetail(id);
  return response;
};

const EditCategory = () => {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const params = useParams();
  const catId = Array.isArray(params.catId) ? params.catId[0] : params.catId;

  const { data: detail, isLoading } = useSWR(
    catId ? ["/admin/cat/getById", catId] : null,
    () => fetcher(catId || ""),
    {
      revalidateOnFocus: false,
    }
  );

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      status: "1",
      catName: "",
      catCode: "",
      displayOrder: 0,
      originSite: "",
    },
  });

  useEffect(() => {
    if (detail) {
      reset({
        status: detail.data.status,
        catName: detail.data.catName,
        catCode: detail.data.catCode,
        displayOrder: detail.data.displayOrder,
        originSite: detail.data.originSite,
      });
    }
  }, [detail, reset]);

  const fetchData = useCallback(
    async (formData: FormData) => {
      const payload: UpdateCategoryRequest = {
        catId: catId || "",
        catCode: formData.catCode,
        catName: formData.catName,
        status: formData.status,
        displayOrder: formData.displayOrder,
        originSite: formData.originSite,
      };
      console.log("payload", payload);

      try {
        setIsSubmit(true);
        const response: BaseResponse = await categoryApi.edit(
          catId || "",
          payload
        );
        if (response.code === "00") {
          router.push("/category");
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSubmit(false);
      }
    },
    [catId, router]
  );

  const onSubmit = (data: FormData) => {
    fetchData(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BreadCrumb>
        <BreadcrumbItem
          pageName="Danh sách danh mục"
          path="/category"
        ></BreadcrumbItem>
        <BreadcrumbItem pageName="Chỉnh sửa danh mục" path="#"></BreadcrumbItem>
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
              onSelect={(value) => field.onChange(value)}
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
            />
          )}
        />
      </SearchForm>
      <Footer>
        <FooterButtons>
          <FooterButton
            type="primary"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmit}
          >
            Lưu
          </FooterButton>
        </FooterButtons>
      </Footer>
    </>
  );
};

export default EditCategory;
