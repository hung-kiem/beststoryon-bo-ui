"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/commons/Loader";
import classNames from "classnames";
import useSidebar from "@hooks/useSidebar";
import { useStatic } from "@/components/commons/StaticProvider/StaticProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  const { loading } = useStatic();
  const { isSidebarCollapsed } = useSidebar();

  return (
    <div
      className={classNames(
        "relative flex flex-1 flex-col duration-300 ease-linear",
        {
          "lg:ml-20": isSidebarCollapsed,
          "lg:ml-60": !isSidebarCollapsed,
        }
      )}
    >
      <main>
        <div className="mx-auto p-4">
          {loading ? <Loader partial /> : children}
        </div>
      </main>
    </div>
  );
}
