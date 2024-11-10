import { GetRolesResponse } from "@/types/role";
import axiosClient from "./axios-client";

export const roleApi = {
  getRoles: async (): Promise<GetRolesResponse> => {
    try {
      const response = await axiosClient.post("/admin/role/search", {});
      console.log("123", response.data);
      return response.data;
    } catch (error) {
      console.error("RoleApi error:", error);
      throw error;
    }
  },
};
