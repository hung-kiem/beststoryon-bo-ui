import { BaseResponse } from "./baseResponse";

export interface GetChapterListRequest {
  storyId: string;
  chapterName: string;
  status: string;
  pageIndex: number;
  pageSize: number;
}

export interface ChapterData {
  chapterId: number;
  chapterIdStr: string;
  storyId: number;
  storyIdStr: string;
  chapterNumber: number;
  chapterIndex: number;
  chapterName: string;
  status: string;
  createdDate: string;
  createdBy: string;
  likeCount: number;
}

export interface GetChapterListResponse {
  data: ChapterData[];
  totalRecord: number;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
}

export interface GetChapterDetailResponse extends BaseResponse {
  data: ChapterDetail;
  totalChapter: number;
}

export interface ChapterDetail {
  chapterId: number;
  storyId: number;
  storyName: string;
  chapterNumber: number | null;
  chapterIndex: number;
  chapterName: string;
  status: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string | null;
  modifiedBy: string | null;
  urlOriginCrawl: string;
  urlCodeChapter: string;
  viewNumber: number;
  published: string;
  publishedDate: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeyword: string | null;
  displayOrder: number | null;
  likeCount: number | null;
  storyNameAlias: string | null;
  chapterContent: string;
}

export interface UpdateChapterRequest {
  chapterName: string;
  status: string;
  likeCount: number;
  viewNumber: number;
}
