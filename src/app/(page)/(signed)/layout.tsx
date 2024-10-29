import React, { ReactNode } from "react";
import Header from "@/components/Layouts/Header";
import Sidebar from "@/components/Layouts/Sidebar";
import ModalUI from "@/components/ui/Modal";
import StaticProvider, {
  ApiResponse,
} from "@/components/commons/StaticProvider/StaticProvider";
import { staticApi } from "@hooks/api/env-config";

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const response = await fetch(staticApi).catch((error) => ({} as any));
  let data: ApiResponse = {
    channels: [],
    emailStatus: [],
    localUserEvents: [],
    localUserStatus: [],
    otpFunctions: [],
    otpTypes: [],
    roleActives: [],
    roleStatus: [],
    roles: [],
    smsStatus: [],
    userEvents: [],
    userStatus: [],
  };
  if (response.ok) {
    data = await response.json();
  }
  return (
    <>
      {/* <!-- ===== Header Start ===== --> */}
      <Header />
      {/* <!-- ===== Header End ===== --> */}
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar />
        {/* <!-- ===== Sidebar End ===== --> */}
        <StaticProvider data={data}>{children}</StaticProvider>
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
      <ModalUI />
    </>
  );
}
