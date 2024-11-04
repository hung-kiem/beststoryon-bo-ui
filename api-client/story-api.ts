import { SearchStoryRequest, SearchStoryResponse } from "@/types/story";
import axiosClient from "./axios-client";

export const storyApi = {
  search: async (payload: SearchStoryRequest): Promise<SearchStoryResponse> => {
    try {
      const response = await axiosClient.post("/admin/story/search", payload);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};
