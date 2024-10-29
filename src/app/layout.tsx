import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/inter.css";
import "@/css/style.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: {
    template: process.env.DEFAULT_TITLE_TEMPLATE ?? "",
    default: process.env.DEFAULT_TITLE_VALUE ?? "",
  },
  description: process.env.DEFAULT_TITLE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
