import { LoginRequest, LoginResponse } from "@/types/auth";
import axiosClient from "./axios-client";

export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosClient.post("/login", payload);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  logout() {
    return axiosClient.post("/logout");
  },
};

export default authApi;
