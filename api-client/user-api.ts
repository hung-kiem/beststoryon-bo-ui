import {
  AddUserRequest,
  AddUserResponse,
  DeleteUserResponse,
  GetUserDetailResponse,
  GetUserListRequest,
  GetUserListResponse,
} from "@/types/user";
import axiosClient from "./axios-client";

export const userApi = {
  getUserList: async (
    payload: GetUserListRequest
  ): Promise<GetUserListResponse> => {
    try {
      const response = await axiosClient.post("/admin/user/search", payload);
      return response.data;
    } catch (error) {
      console.error("UserApi error:", error);
      throw error;
    }
  },
  getUserDetail: async (userName: string): Promise<GetUserDetailResponse> => {
    try {
      const response = await axiosClient.get(`/admin/user/get/${userName}`);
      return response.data;
    } catch (error) {
      console.error("UserApi error:", error);
      throw error;
    }
  },
  addUser: async (params: AddUserRequest): Promise<AddUserResponse> => {
    try {
      const response = await axiosClient.post("/admin/user/add", params);
      return response.data;
    } catch (error) {
      console.error("UserApi error:", error);
      throw error;
    }
  },
  editUser: async (payload: AddUserRequest): Promise<AddUserResponse> => {
    try {
      const response = await axiosClient.post("/admin/user/update", payload);
      return response.data;
    } catch (error) {
      console.error("UserApi error:", error);
      throw error;
    }
  },
  deleteUser: async (userName: string): Promise<DeleteUserResponse> => {
    try {
      const response = await axiosClient.post(`/admin/user/delete/${userName}`);
      return response.data;
    } catch (error) {
      console.error("UserApi error:", error);
      throw error;
    }
  },
};
