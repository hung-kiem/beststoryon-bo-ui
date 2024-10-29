import Modal from "@/components/ui/Modal/Modal";

export default function ModalDemoNotify() {
  return (
    <Modal size={"lg"}>
      <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
        Modal Alert
      </h2>
      <p>Cảnh báo, thêm hiển thị text vào đây</p>
      <p>Thêm dòng</p>
      <p>Thêm dòng</p>
    </Modal>
  );
}
