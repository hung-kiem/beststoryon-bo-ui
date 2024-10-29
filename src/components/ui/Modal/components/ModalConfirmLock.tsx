import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Buttons/Button";
import { closeModal } from "@/components/ui/Modal";
import Input from "@/components/ui/Input/Input";

export default function ModalConfirmLock() {
  return (
    <Modal>
      <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
        Modal title lock
      </h2>
      <div className="mb-7.5 flex flex-col gap-2">
        <Input label="Tên đăng nhập" />
        <Input label="Email" />
        <Input label="Password" />
      </div>
      <Button type="black" size="medium" onClick={closeModal}>
        Đóng
      </Button>
    </Modal>
  );
}
