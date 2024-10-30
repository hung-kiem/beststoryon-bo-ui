import axiosClient from "./axios-client";

export const authApi = {
  login: async () => {
    try {
      const response = await axiosClient.get("/login");
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  authorizedSso: async (session_state: string, code: string) => {
    return await axiosClient.get("/authorized_sso", {
      params: {
        session_state,
        code,
      },
    });
  },
  getProfile() {
    return axiosClient.get("/v1/authentication");
  },
  logout() {
    return axiosClient.post("/logout");
  },
};

export default authApi;
