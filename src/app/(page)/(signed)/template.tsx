"use client";
import React from "react";
import classNames from "classnames";
import useSidebar from "@hooks/useSidebar";
import { useBreadCrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/ui/Breadcrumb/BaseBreadcrumb";
import { useStatic } from "@/components/commons/StaticProvider/StaticProvider";
import { useSearchFooters, useSearchForm } from "@/components/commons/Form";
import { useTable } from "@/components/ui/Tables/useTable";
import Loader from "@/components/commons/Loader";
import { useDetailForm } from "@/components/commons/Form/DetailForm";

export default function Template({ children }: { children: React.ReactNode }) {
  const { loading } = useStatic();
  const { isSidebarCollapsed } = useSidebar();
  const { breadCrumbs } = useBreadCrumb();
  const { searchForms } = useSearchForm();
  const { detailForms } = useDetailForm();
  const { buttonsFooter } = useSearchFooters();
  const { table } = useTable();

  if (loading) return <Loader />;

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
        <div
          className={`relative mx-auto max-w-[calc(100vw-20rem)] p-4 transition-all duration-300`}
        >
          {breadCrumbs && <Breadcrumb>{breadCrumbs}</Breadcrumb>}
          {detailForms && (
            <div className="mt-6 space-y-6 mb-6">{detailForms}</div>
          )}
          {searchForms && (
            <div className="mb-4 flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black">
              {searchForms && (
                <div
                  className="grid grow grid-cols-1
                  gap-4
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4"
                >
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
            </div>
          )}

          {table && <div className="overflow-hidden rounded-xl">{table}</div>}
          {children}
        </div>
      </main>
    </div>
  );
}
