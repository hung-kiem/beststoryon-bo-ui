"use client";

import { create } from "zustand";
import ModalConfirmLock from "@/components/ui/Modal/components/ModalConfirmLock";
import { useDeferredValue } from "react";
import ModalConfirmUnLock from "@/components/ui/Modal/components/ModalConfirmUnLock";
import ModalConfirmClose from "@/components/ui/Modal/components/ModalConfirmClose";
import ModalDemoNotify from "@/components/ui/Modal/components/demo/ModalDemoNotify";
import ModalDemoLG from "@/components/ui/Modal/components/demo/ModalDemoLG";
import ModalDemoSM from "@/components/ui/Modal/components/demo/ModalDemoSM";
import ModalDemoMD from "@/components/ui/Modal/components/demo/ModalDemoMD";

type modal =
  | "confirm-lock"
  | "confirm-unlock"
  | "confirm-close"
  | "demo-sm"
  | "demo-md"
  | "demo-lg"
  | "demo-alert";

const store = create<{
  data?: any;
  modal?: modal;
  openModal: (modal, data) => void;
  closeModal: () => void;
}>((setState) => ({
  openModal: (modal, data) => setState({ modal, data }),
  closeModal: () => setState({ modal: undefined, data: undefined }),
}));

export default function ModalUI() {
  const { modal, data } = store();
  const modalType = useDeferredValue(modal);
  const items = useDeferredValue(data || {});
  return (
    <>
      {modalType == "confirm-unlock" && <ModalConfirmUnLock {...items} />}
      {modalType == "confirm-lock" && <ModalConfirmLock {...items} />}
      {modalType == "confirm-close" && <ModalConfirmClose {...items} />}
      {modalType == "demo-sm" && <ModalDemoSM {...items} />}
      {modalType == "demo-md" && <ModalDemoMD {...items} />}
      {modalType == "demo-lg" && <ModalDemoLG {...items} />}
      {modalType == "demo-alert" && <ModalDemoNotify {...items} />}
    </>
  );
}

export function closeModal() {
  document.body.classList.remove("overflow-hidden");
  store.setState({ modal: undefined, data: undefined });
}

export function openModal<T>(modal: modal, data?: T) {
  document.body.classList.add("overflow-hidden");
  store.setState({ modal, data });
}
