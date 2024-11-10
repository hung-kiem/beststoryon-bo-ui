import { BaseResponse } from "./baseResponse";

export interface GetUserListRequest {
  userName: string;
  status: string;
  pageIndex: number;
  pageSize: number;
}

export interface GetUserListResponse extends BaseResponse {
  data: UserData[];
  totalRecords: number;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
}

export interface UserData {
  userName: string;
  status: string;
  email: string;
  roleName: string;
  roleId: number;
  createdDate: string;
  updatedDate: string;
}

export interface GetUserDetailResponse extends BaseResponse {
  data: UserData;
}

export interface AddUserRequest {
  userName: string;
  password: string;
  roleId: string;
  status: string;
  email: string;
}

export interface AddUserResponse extends BaseResponse {
  data: string;
}

export interface DeleteUserResponse extends BaseResponse {
  data: string;
}
