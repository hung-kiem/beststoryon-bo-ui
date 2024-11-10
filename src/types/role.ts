import { BaseResponse } from "./baseResponse";

export interface GetRolesResponse extends BaseResponse {
  data: RoleOptions[];
}

export interface RoleOptions {
  roleId: number;
  roleName: string;
}
