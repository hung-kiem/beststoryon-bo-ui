import {
  AddBannerRequest,
  AddBannerResponse,
  GetBannerDetailResponse,
  GetBannerListRequest,
  GetBannerListResponse,
  UpdateBannerRequest,
  UpdateBannerResponse,
} from "@/types/banner";
import axiosClient from "./axios-client";

export const bannerApi = {
  getBannerList: async (
    payload: GetBannerListRequest
  ): Promise<GetBannerListResponse> => {
    try {
      const response = await axiosClient.post("/admin/banner/search", payload);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  getBannerDetail: async (id: string): Promise<GetBannerDetailResponse> => {
    try {
      const response = await axiosClient.post(`/admin/banner/getById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  addBanner: async (payload: AddBannerRequest): Promise<AddBannerResponse> => {
    try {
      const response = await axiosClient.post("/admin/banner/add", payload);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  updateBanner: async (
    id: string,
    payload: UpdateBannerRequest
  ): Promise<UpdateBannerResponse> => {
    try {
      const response = await axiosClient.post(
        `/admin/banner/updateById/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};
