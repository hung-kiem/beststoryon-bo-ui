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
