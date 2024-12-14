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
  bannerIdStr: string;
  bannerName: string;
  bannerType: "IMAGE" | "HTML";
  bannerDesc: string;
  status: string;
  createdDate: string;
  createdBy?: string;
  modifiedDate?: string | null;
  modifieddBy?: string | null;
  bannerPos?: string;
  bannerPage: string;
  bannerUrl: string;
  bannerLinkTo: string;
  bannerOpenType: "_self" | "_blank" | "_parent" | "_top";
  bannerHTML?: string;
}

export interface GetBannerDetailResponse {
  data: BannerData;
}

export interface AddBannerRequest {
  bannerName: string;
  status: string;
  bannerPos?: string;
  bannerPage: string;
  bannerHTML?: string;
  bannerDesc?: string;
  bannerType: "IMAGE" | "HTML";
}

export interface AddBannerResponse extends BaseResponse {
  bannerId: number;
}

export interface UpdateBannerRequest {
  bannerId: string;
  bannerName: string;
  status: string;
  bannerPos?: string;
  bannerPage: string;
  bannerHTML?: string;
  bannerDesc?: string;
  bannerType: "IMAGE" | "HTML";
}

export interface UpdateBannerResponse extends BaseResponse {
  bannerId: number;
}
