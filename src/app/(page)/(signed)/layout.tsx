"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SWRConfig } from "swr";

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/inter.css";
import "@/css/style.css";

import ModalUI from "@/components/ui/Modal";
import Sidebar from "@/components/Layouts/Sidebar";
import Header from "@/components/Layouts/Header";
import axiosClient from "../../../../api-client/axios-client";
import StaticProvider from "@/components/commons/StaticProvider/StaticProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  console.log("RootLayout");

  if (pathname === "/signIn") {
    return (
      <>
        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            shouldRetryOnError: false,
          }}
        >
          <html lang="en">
            <body>
              <main>{children}</main>
            </body>
          </html>
        </SWRConfig>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <StaticProvider>{children}</StaticProvider>
      </div>
      <ModalUI />
    </>
  );
}
