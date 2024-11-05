import {
  CreateCategoryRequest,
  SearchCategoryDetailResponse,
  SearchCategoryRequest,
  SearchCategoryResponse,
  UpdateCategoryRequest,
} from "@/types/category";
import axiosClient from "./axios-client";
import { create } from "domain";
import { BaseResponse } from "@/types/baseResponse";

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
  getDetail: async (id: string): Promise<SearchCategoryDetailResponse> => {
    try {
      const response = await axiosClient.post(`/admin/cat/getById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  create: async (payload: CreateCategoryRequest): Promise<BaseResponse> => {
    try {
      const response = await axiosClient.post("/admin/cat/add", payload);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  edit: async (
    id: string,
    payload: UpdateCategoryRequest
  ): Promise<BaseResponse> => {
    try {
      const response = await axiosClient.post(
        `/admin/cat/updateById/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  getAll: async (
    payload: SearchCategoryRequest
  ): Promise<SearchCategoryResponse> => {
    try {
      const response = await axiosClient.post("/admin/cat/getAll", payload);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};
