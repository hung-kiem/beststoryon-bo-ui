import { BaseResponse } from "./baseResponse";

export interface SearchCategoryRequest {
  catName: string;
  status: string;
  pageIndex: number;
  pageSize: number;
}

export interface SearchCategoryResponse extends BaseResponse {
  data: Category[];
  totalRecord: number;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
}

export interface Category {
  catId: number;
  catCode: string;
  catName: string;
  displayOrder: number;
  originSite: string;
  status: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string | null;
  modifiedBy: string | null;
}
