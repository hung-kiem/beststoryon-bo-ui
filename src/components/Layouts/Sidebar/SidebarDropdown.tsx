import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { MenuItems } from "./menu";

function SidebarDropdown({
  item,
  isSidebarCollapsed,
}: {
  item: MenuItems[];
  isSidebarCollapsed: boolean;
}) {
  const pathname = usePathname();
  return (
    <>
      <ul
        className={classNames(
          "relative mb-5.5 mt-4 flex flex-col gap-2.5 pl-6",
          {
            "lg:absolute lg:left-18 lg:z-9999 lg:mt-[-36px] lg:bg-white lg:py-6 lg:opacity-0 lg:group-hover:opacity-100 dark:lg:bg-boxdark-2":
              isSidebarCollapsed,
            "relative mb-5.5 mt-4 pl-6": !isSidebarCollapsed,
          }
        )}
      >
        {item.map((menuItem: MenuItems, index: number) => (
          <li key={index}>
            <Link
              href={menuItem.route || "#"}
              className={classNames(
                "group relative flex items-center gap-2.5 whitespace-nowrap rounded-md px-4 text-xs",
                "font-medium text-black duration-300 ease-in-out hover:!text-secondary dark:text-white",
                {
                  "!text-secondary dark:!text-secondary":
                    pathname == menuItem.route,
                }
              )}
            >
              {menuItem.label}
            </Link>

            {/* Menu cấp 3 */}
            {menuItem.children && (
              <ul
                className={classNames("pl-6 mt-2 flex flex-col gap-2.5", {
                  "lg:absolute lg:left-18 lg:z-9999 lg:mt-[-36px] lg:bg-white lg:py-6 lg:opacity-0 lg:group-hover:opacity-100 dark:lg:bg-boxdark-2":
                    isSidebarCollapsed,
                  "pl-6": !isSidebarCollapsed,
                })}
              >
                {menuItem.children.map(
                  (subItem: MenuItems, subIndex: number) => (
                    <li key={subIndex}>
                      <Link
                        href={subItem.route || "#"}
                        className={classNames(
                          "group relative flex items-center gap-2.5 whitespace-nowrap rounded-md px-4 text-xs",
                          "font-medium text-black duration-300 ease-in-out hover:!text-secondary dark:text-white",
                          {
                            "!text-secondary dark:!text-secondary":
                              pathname == subItem.route,
                          }
                        )}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SidebarDropdown;
