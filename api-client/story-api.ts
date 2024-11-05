import {
  SearchStoryRequest,
  SearchStoryResponse,
  StoryDetailResponse,
} from "@/types/story";
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
  getDetail: async (id: string): Promise<StoryDetailResponse> => {
    try {
      const response = await axiosClient.post(`/admin/story/getById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};
