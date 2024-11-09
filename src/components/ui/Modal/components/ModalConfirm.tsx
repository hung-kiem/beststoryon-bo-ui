import Modal from "@/components/ui/Modal/Modal";
import { closeModal, ModalData } from "@/components/ui/Modal";
import Button from "../../Buttons/Button";

interface FormValues {
  title: string;
  contentConfirm: string;
}

export default function ModalConfirm({
  title,
  contentConfirm,
  onConfirm,
}: ModalData) {
  return (
    <Modal size={"lg"}>
      <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
        {title}
      </h2>
      <div className="mb-7.5 flex flex-col gap-2">{contentConfirm}</div>
      <Button type="black" size="medium" onClick={closeModal}>
        Đóng
      </Button>
      <Button
        type="primary"
        size="medium"
        onClick={() => {
          closeModal;
          if (onConfirm) {
            onConfirm();
          }
        }}
      >
        Lấy lại dữ liệu gốc
      </Button>
    </Modal>
  );
}
