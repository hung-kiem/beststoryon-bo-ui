import { BaseResponse } from "./baseResponse";

export interface SearchStoryRequest {
  catId: string;
  storyName: string;
  status: string;
  pageIndex: number;
  pageSize: number;
}

export interface SearchStoryResponse extends BaseResponse {
  data: StoryData[];
  totalRecord: number;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
}

export interface StoryData {
  storyId: number;
  storyIdStr: string;
  storyName: string;
  storySummary: string;
  storyAuthor: string;
  chapterNumber: number;
  status: string;
  storyStatus: string;
  urlAvatar: string;
  urlOriginCrawl: string;
  createdDate: string | null;
  createdBy: string | null;
  modifiedDate: string | null;
  modifiedBy: string | null;
  tagCodeRef: string;
  catCodeRef: string;
  urlCode: string;
  viewNumber: number;
  published: string;
  publishedDate: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeyword: string | null;
  displayOrder: number;
  likeCount: number | null;
  isHot: string;
  isTopFocus: string;
  storyNameAlias: string | null;
  catName: string | null;
}

export interface StoryDetailResponse {
  storyId: number;
  storyName: string;
  storySummary: string;
  storyAuthor: string | null;
  chapterNumber: number;
  status: string;
  storyStatus: string;
  urlAvatar: string;
  urlOriginCrawl: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string | null;
  modifiedBy: string | null;
  tagCodeRef: string;
  catCodeRef: string;
  urlCode: string;
  viewNumber: number;
  published: string;
  publishedDate: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeyword: string | null;
  displayOrder: number;
  likeCount: number | null;
  isHot: string;
  isTopFocus: string;
  storyNameAlias: string | null;
  storyCatMap: StoryCategoryMap[];
}

export interface StoryCategoryMap {
  scMapId: number;
  storyId: number;
  catId: number;
  status: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string | null;
  modifieddBy: string | null;
}

export interface UpdateStoryRequest {
  storyNameAlias: string;
  storyStatus: string;
  viewNumber: number;
  likeCount: number;
  isHot: string;
  isTopFocus: string;
  storyName: string;
  displayOrder: number;
}
