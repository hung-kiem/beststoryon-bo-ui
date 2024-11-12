"use client";

import useSidebar from "@hooks/useSidebar";
import React from "react";
import classNames from "classnames";
import ClickOutside from "@/components/ClickOutside";
import { menuGroups } from "./menu";
import ScopeWrapper from "@/components/commons/ScopeWrapper";
import SidebarItem from "./SidebarItem";
import useSessionStorage from "@hooks/useSessionStorage";

const Sidebar = () => {
  const [pageName, setPageName] = useSessionStorage("pathname", "dashboard");
  const { sidebarOpen, setSidebarOpen, isSidebarCollapsed } = useSidebar();

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={classNames(
          "fixed left-0 top-0 z-999999 flex h-screen w-60 flex-col bg-gray-2 duration-300 ease-linear dark:bg-boxdark lg:z-9999 lg:translate-x-0",
          {
            "translate-x-0": sidebarOpen,
            "-translate-x-full": !sidebarOpen,
            "lg:w-20": isSidebarCollapsed,
          }
        )}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-4 py-6.5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col duration-300 ease-linear lg:mt-8">
          {/* <!-- Sidebar Menu --> */}
          <nav className="px-2 py-2">
            {menuGroups
              .filter(
                (group) =>
                  !group.modes ||
                  group.modes.includes(
                    process.env.NODE_ENV as "development" | "production"
                  )
              )
              .map((group, groupIndex) => (
                <div key={groupIndex}>
                  {!!group?.["name"] && (
                    <h3
                      className={classNames(
                        "mb-4 ml-4 text-sm font-semibold text-bodydark2 opacity-100 transition-opacity",
                        {
                          "lg:hidden": isSidebarCollapsed,
                        }
                      )}
                    >
                      {group?.["name"]}
                    </h3>
                  )}

                  <ul className="mb-6 flex flex-col gap-1.5">
                    {group.menuItems.map((menuItem, menuIndex) => (
                      <ScopeWrapper key={menuIndex} scopes={menuItem.scope}>
                        <SidebarItem
                          item={menuItem}
                          pageName={pageName}
                          setPageName={setPageName}
                          isSidebarCollapsed={isSidebarCollapsed}
                        />
                      </ScopeWrapper>
                    ))}
                  </ul>
                </div>
              ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className={
            "fixed left-0 top-0 z-99999 h-screen w-screen bg-graydark bg-opacity-50 lg:hidden"
          }
        />
      )}
    </ClickOutside>
  );
};

export default Sidebar;
