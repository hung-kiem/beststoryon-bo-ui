"use client";

import { create } from "zustand";
import { useDeferredValue } from "react";
import ModalSendSms from "./components/ModalSendSms";
import { CategoryItem } from "@/types/category";
import ModalCategoryDetail from "./components/ModalCategoryDetail";
import ModalCrawlChapter from "./components/ModalCrawlChapter";
import ModalDeleteChapter from "./components/ModalDeleteChapter";

type modal =
  | "send-sms"
  | "category-detail"
  | "crawl-chapter"
  | "delete-chapter";

export interface ModalData {
  phone?: string;
  content?: string;
  onSubmitted?: (phone: string, content: string) => void;
  more?: string;
  categoryData?: CategoryItem;
  title?: string;
  contentConfirm?: string;
  onConfirm?: () => void;
}

export const store = create<{
  data?: ModalData;
  modal?: modal;
  openModal: (modal: modal, data: ModalData) => void;
  closeModal: () => void;
}>((setState) => ({
  openModal: (modal, data) => setState({ modal, data }),
  closeModal: () => setState({ modal: undefined, data: undefined }),
}));

export default function ModalUI() {
  const { modal, data } = store();
  const modalType = useDeferredValue(modal);
  const items = useDeferredValue(data || { title: "", contentConfirm: "" });
  return (
    <>
      {modalType == "send-sms" && <ModalSendSms {...items} />}
      {modalType == "category-detail" && <ModalCategoryDetail {...items} />}
      {modalType == "crawl-chapter" && <ModalCrawlChapter {...items} />}
      {modalType == "delete-chapter" && <ModalDeleteChapter {...items} />}
    </>
  );
}

export function closeModal() {
  document.body.classList.remove("overflow-hidden");
  store.setState({ modal: undefined, data: undefined });
}

export function openModal<T extends ModalData>(modal: modal, data?: T) {
  document.body.classList.add("overflow-hidden");
  store.setState({ modal, data });
}
