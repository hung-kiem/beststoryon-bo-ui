import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Select, { Option } from "@/components/ui/Select/Select";
import { roleApi } from "@apiClient/role-api";
import { RoleOptions } from "@/types/role";

export interface SelectRoleProps {
  onChange: (value: string) => void;
  defaultValue: string;
}

const SelectRole: React.FC<SelectRoleProps> = ({ onChange, defaultValue }) => {
  const { data, isValidating, isLoading } = useSWR(
    "getRoles",
    () => roleApi.getRoles(),
    {
      dedupingInterval: 3600000,
      revalidateOnFocus: false,
    }
  );
  const [roleOption, setRoleOption] = useState<Option[]>([]);

  useEffect(() => {
    if (data && !isValidating) {
      console.log(data);
      const allOption = { value: "", label: "Tất cả" };
      const options = [
        allOption,
        ...data?.data?.map((role: RoleOptions) => ({
          value: role.roleId.toString(),
          label: role.roleName,
        })),
      ];
      setRoleOption(options);
    }
  }, [data, isValidating, isLoading]);

  return (
    <Select
      label="Chọn nhóm quyền"
      options={roleOption}
      title="Chọn nhóm quyền"
      isLive
      onSelect={onChange}
      value={defaultValue.toString() || ""}
    />
  );
};

export default SelectRole;
