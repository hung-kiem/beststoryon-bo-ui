import { BaseResponse } from "./baseResponse";

export interface SearchCategoryRequest {
  catName: string;
  status: string;
  pageIndex: number;
  pageSize: number;
}

export interface SearchCategoryResponse extends BaseResponse {
  data: CategoryItem[];
  totalRecord: number;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
}

export interface CategoryItem {
  catId: string;
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

export interface SearchCategoryDetailResponse extends BaseResponse {
  data: CategoryItem;
}

export interface CreateCategoryRequest {
  catCode: string;
  cateName: string;
  status: string;
  displayOrder: number;
  originSite: string;
}

export interface UpdateCategoryRequest {
  catId: string;
  catCode: string;
  catName: string;
  status: string;
  displayOrder: number;
  originSite: string;
}
