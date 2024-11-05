import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { categoryApi } from "../../../../../api-client/category-api";
import Select, { Option } from "@/components/ui/Select/Select";
import { CategoryItem } from "@/types/category";

export interface SelectCategoryProps {
  onChange: (value: string) => void;
  defaultValue: string;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  onChange,
  defaultValue,
}) => {
  const {
    data: apps,
    isValidating,
    isLoading,
  } = useSWR(
    "getCategory",
    () =>
      categoryApi.getAll({
        catName: "",
        status: "",
        pageIndex: 1,
        pageSize: 100,
      }),
    {
      dedupingInterval: 3600000,
      revalidateOnFocus: false,
    }
  );
  console.log("apps", apps);
  const [catOptions, setCatOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (apps && !isValidating) {
      const allOption = { value: "", label: "Tất cả" };
      const options = [
        allOption,
        ...apps.data.map((app: CategoryItem) => ({
          value: app.catId,
          label: app.catName,
        })),
      ];
      setCatOptions(options);
    }
  }, [apps, isValidating, isLoading]);

  return (
    <Select
      label="Chọn thể loại"
      options={catOptions}
      title="Chọn thể loại"
      isLive
      onSelect={onChange}
      value={defaultValue || ""}
    />
  );
};

export default SelectCategory;
