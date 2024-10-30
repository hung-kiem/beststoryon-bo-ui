"use client";
import React from "react";
import classNames from "classnames";
import { useBreadCrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/ui/Breadcrumb/BaseBreadcrumb";
import { useStatic } from "@/components/commons/StaticProvider/StaticProvider";
import useSidebar from "@hooks/useSidebar";
import { useSearchFooters, useSearchForm } from "@/components/commons/Form";
import { useTable } from "@/components/ui/Tables/useTable";
import Loader from "@/components/commons/Loader";

export default function Template({ children }: { children: React.ReactNode }) {
  const { loading } = useStatic();
  const { isSidebarCollapsed } = useSidebar();
  const { breadCrumbs } = useBreadCrumb();
  const { searchForms } = useSearchForm();
  const { buttonsFooter } = useSearchFooters();
  const { table } = useTable();

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
          {loading ? (
            <Loader partial />
          ) : (
            <>
              {breadCrumbs && <Breadcrumb>{breadCrumbs}</Breadcrumb>}
              <div className="mb-4 flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black">
                {searchForms && (
                  <div className="grid grow grid-cols-4 gap-4">
                    {searchForms}
                  </div>
                )}
                <div className="rounded-lg bg-white dark:border-strokedark dark:bg-boxdark">
                  {buttonsFooter && (
                    <div className="flex flex-wrap justify-center gap-5">
                      {buttonsFooter}
                    </div>
                  )}
                </div>
                {children}
              </div>
              {table && (
                <div className="overflow-hidden rounded-xl">{table}</div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
