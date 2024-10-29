"use client";

import React, { ReactNode } from "react";
import useSidebar from "@hooks/useSidebar";
import classNames from "classnames";
import useColorMode from "@hooks/useColorMode";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen } = useSidebar();
  const [theme] = useColorMode();
  return (
    <html lang="en">
      <body
        className={classNames("overflow-auto", {
          "max-lg:overflow-hidden": sidebarOpen,
          dark: theme == "dark",
        })}
      >
        <div className="min-h-screen dark:bg-boxdark-2 dark:text-bodydark">
          {children}
        </div>
      </body>
    </html>
  );
}
