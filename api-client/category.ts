import {
  SearchCategoryRequest,
  SearchCategoryResponse,
} from "@/types/category";
import axiosClient from "./axios-client";

export const categoryApi = {
  search: async (
    payload: SearchCategoryRequest
  ): Promise<SearchCategoryResponse> => {
    try {
      const response = await axiosClient.post("/admin/cat/search", payload);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};
