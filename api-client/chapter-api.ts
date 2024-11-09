import {
  GetChapterDetailResponse,
  GetChapterListRequest,
  GetChapterListResponse,
  UpdateChapterRequest,
} from "@/types/chapter";
import axiosClient from "./axios-client";

export const chapterApi = {
  getChapterList: async (
    payload: GetChapterListRequest
  ): Promise<GetChapterListResponse> => {
    try {
      const response = await axiosClient.post("/admin/chapter/search", payload);
      return response.data;
    } catch (error) {
      console.error("chapterApi error:", error);
      throw error;
    }
  },
  getChapterDetail: async (
    chapterId: string
  ): Promise<GetChapterDetailResponse> => {
    try {
      const response = await axiosClient.post(
        `/admin/chapter/getById/${chapterId}`
      );
      return response.data;
    } catch (error) {
      console.error("chapterApi error:", error);
      throw error;
    }
  },
  updateChapter: async (
    chapterId: string,
    payload: UpdateChapterRequest
  ): Promise<boolean> => {
    try {
      const response = await axiosClient.post(
        "/admin/chapter/updateById/" + chapterApi,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("chapterApi error:", error);
      throw error;
    }
  },
  reCrawlChapter: async (chapterId: string): Promise<boolean> => {
    try {
      const response = await axiosClient.post(
        "/admin/chapter/re-crawl-data/" + chapterId
      );
      return response.data;
    } catch (error) {
      console.error("chapterApi error:", error);
      throw error;
    }
  },
  deleteChapter: async (chapterId: string): Promise<boolean> => {
    try {
      const response = await axiosClient.post(
        "/admin/chapter/deleteById/" + chapterId
      );
      return response.data;
    } catch (error) {
      console.error("chapterApi error:", error);
      throw error;
    }
  },
};
