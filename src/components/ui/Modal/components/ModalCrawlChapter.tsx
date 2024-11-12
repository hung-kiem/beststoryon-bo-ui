import Modal from "@/components/ui/Modal/Modal";
import { closeModal, ModalData } from "@/components/ui/Modal";
import Button from "../../Buttons/Button";
import React from "react";

export default function ModalCrawlChapter({ onConfirm }: ModalData) {
  return (
    <Modal size={"lg"}>
      <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
        Thông báo
      </h2>
      <div className="mb-7.5 flex flex-col gap-2">
        Bạn có thực sự muốn thực hiện?
      </div>
      <div className="flex justify-center gap-4">
        <Button type="black" size="medium" onClick={closeModal}>
          Không
        </Button>
        <Button
          type="primary"
          size="medium"
          onClick={() => {
            closeModal();
            if (onConfirm) {
              onConfirm();
            }
          }}
        >
          Đồng ý
        </Button>
      </div>
    </Modal>
  );
}
