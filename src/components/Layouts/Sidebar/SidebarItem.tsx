import Link from "next/link";
import SidebarDropdown from "@/components/Layouts/Sidebar/SidebarDropdown";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import React, { ReactNode } from "react";
import { MenuItems } from "./menu";

function SidebarWrapper({
  children,
  pageName,
  setPageName,
  isSidebarCollapsed,
  item,
}: {
  children: ReactNode;
  pageName: string;
  setPageName: (pageName: string) => void;
  isSidebarCollapsed: boolean;
  item: MenuItems;
}) {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    return setPageName(updatedPageName);
  };

  const pathname = usePathname();

  const isActive = (item: MenuItems): boolean => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child: MenuItems) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);
  if (item.route)
    return (
      <Link
        href={item.route}
        onClick={handleClick}
        className={classNames(
          "unselectable group relative flex items-center rounded-sm px-4 py-2 text-sm font-medium",
          "text-graydark duration-300 ease-in-out hover:bg-secondary",
          "hover:text-white dark:text-white dark:hover:bg-secondary max-lg:gap-2.5",
          {
            "bg-primary !text-white dark:bg-meta-4": isItemActive,
            "lg:justify-center": isSidebarCollapsed,
            "gap-2.5": !isSidebarCollapsed,
          }
        )}
      >
        {children}
      </Link>
    );

  return (
    <div
      onClick={handleClick}
      className={classNames(
        "unselectable group relative flex items-center rounded-sm px-4 py-2 text-sm font-medium",
        "text-graydark duration-300 ease-in-out hover:bg-secondary",
        "hover:text-white dark:text-white dark:hover:bg-secondary max-lg:gap-2.5",
        {
          "bg-primary !text-white dark:bg-meta-4": isItemActive,
          "lg:justify-center": isSidebarCollapsed,
          "gap-2.5": !isSidebarCollapsed,
        }
      )}
      role={"button"}
    >
      {children}
    </div>
  );
}

const SidebarItem = ({
  item,
  pageName,
  setPageName,
  isSidebarCollapsed,
}: {
  item: MenuItems;
  pageName: string;
  setPageName: (pageName: string) => void;
  isSidebarCollapsed: boolean;
}) => {
  return (
    <>
      <li className="group relative">
        <SidebarWrapper
          isSidebarCollapsed={isSidebarCollapsed}
          item={item}
          setPageName={setPageName}
          pageName={pageName}
        >
          {item.icon}
          <div
            className={classNames("w-auto opacity-100", {
              "lg:h-0 lg:w-0 lg:opacity-0": isSidebarCollapsed,
            })}
          >
            {item.label}
          </div>

          {item.children && (
            <svg
              className={classNames(
                "absolute right-4 top-1/2 w-auto -translate-y-1/2 fill-current opacity-100",
                {
                  "rotate-180": pageName === item.label.toLowerCase(),
                  "lg:w-0 lg:opacity-0": isSidebarCollapsed,
                }
              )}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                fill=""
              />
            </svg>
          )}
        </SidebarWrapper>

        {item.children && (
          <div
            className={classNames("translate transform", {
              hidden: pageName !== item.label.toLowerCase(),
            })}
          >
            <SidebarDropdown
              item={item.children}
              isSidebarCollapsed={isSidebarCollapsed}
            />
          </div>
        )}
      </li>
    </>
  );
};

export default SidebarItem;
