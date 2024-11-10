import { BaseResponse } from "./baseResponse";

export interface GetBannerListRequest {
  bannerName: string;
  status: string;
  pageIndex: number;
  pageSize: number;
}

export interface GetBannerListResponse extends BaseResponse {
  data: BannerData[];
  totalRecords: number;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
}

export interface BannerData {
  bannerId: number;
  bannerName: string;
  bannerType: "IMAGE" | "HTML"; // Loại banner có thể là "IMAGE" hoặc "HTML"
  bannerDesc: string;
  status: string;
  createdDate: string; // ISO 8601 date string
  createdBy?: string; // Optional vì có thể rỗng
  modifiedDate?: string | null; // Có thể null hoặc không có
  modifieddBy?: string | null; // Có thể null hoặc không có
  bannerPos?: string; // Optional
  bannerPage: string;
  bannerUrl: string;
  bannerLinkTo: string;
  bannerOpenType: "_self" | "_blank" | "_parent" | "_top"; // Các giá trị được quy định
  bannerHTML?: string; // Optional vì có thể rỗng
}

export interface GetBannerDetailResponse {
  data: BannerData;
}

export interface AddBannerRequest {
  bannerName: string;
  bannerType: "IMAGE" | "HTML"; // Loại banner có thể là "IMAGE" hoặc "HTML"
  bannerDesc: string;
  status: string;
  bannerPos?: string; // Optional
  bannerPage: string;
  bannerUrl: string;
  bannerLinkTo: string;
  bannerOpenType: "_self" | "_blank" | "_parent" | "_top"; // Các giá trị được quy định
  bannerHTML?: string; // Optional vì có thể rỗng
}

export interface AddBannerResponse extends BaseResponse {
  bannerId: number;
}

export interface UpdateBannerRequest {
  bannerId: number;
  bannerName: string;
  bannerType: "IMAGE" | "HTML"; // Loại banner có thể là "IMAGE" hoặc "HTML"
  bannerDesc: string;
  status: string;
  bannerPos?: string; // Optional
  bannerPage: string;
  bannerUrl: string;
  bannerLinkTo: string;
  bannerOpenType: "_self" | "_blank" | "_parent" | "_top"; // Các giá trị được quy định
  bannerHTML?: string; // Optional vì có thể rỗng
}

export interface UpdateBannerResponse extends BaseResponse {
  bannerId: number;
}
