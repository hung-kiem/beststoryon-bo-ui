import { BaseResponse } from "./baseResponse";

export interface LoginRequest {
  username: string;
  password: string;
  ipAddress?: string;
}

export interface LoginResponse extends BaseResponse {
  data: UserInfo;
}

export interface UserInfo {
  username: string;
  jwtToken: string;
  roles: string[];
}
