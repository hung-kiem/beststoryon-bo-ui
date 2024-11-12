import React from "react";
import Modal from "@/components/ui/Modal/Modal";
import InputDetail from "../../Input/InputDetail";
import { ModalData } from "..";

export default function ModalCategoryDetail({ categoryData }: ModalData) {
  return (
    <Modal size="full">
      <h2 className="mb-4 justify-center text-xl font-bold text-black dark:text-white">
        Chi tiết danh mục
      </h2>
      {categoryData ? (
        <div className="grid grid-cols-1 gap-4">
          <InputDetail label="Mã danh mục" value={categoryData?.catCode} />
          <InputDetail label="Tên danh mục" value={categoryData?.catName} />
          <InputDetail
            label="Trạng thái"
            value={categoryData?.status === "1" ? "Hoạt động" : "Khóa"}
          />
          <InputDetail
            label="Thứ tự ưu tiên"
            value={categoryData?.displayOrder?.toString() || ""}
          />
        </div>
      ) : (
        <p>Không có dữ liệu để hiển thị.</p>
      )}
    </Modal>
  );
}
