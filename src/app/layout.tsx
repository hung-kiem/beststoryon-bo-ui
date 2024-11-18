import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/inter.css";
import "@/css/style.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "BO",
    default: "Back Office",
  },
  description: "Back Office",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
