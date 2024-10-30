import { BaseResponse } from "./baseResponse";

export interface LoginResponse extends BaseResponse {
  data: UserInfo;
}

export interface UserInfo {
  username: string;
  accessToken: string;
}
