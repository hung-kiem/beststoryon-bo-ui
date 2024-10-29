import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

function SidebarDropdown({
  item,
  isSidebarCollapsed,
}: {
  item: any;
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
          },
        )}
      >
        {item.map((item: any, index: number) => (
          <li key={index}>
            <Link
              href={item.route}
              className={classNames(
                "group relative flex items-center gap-2.5 whitespace-nowrap rounded-md px-4 text-xs",
                "font-medium text-black duration-300 ease-in-out hover:!text-secondary dark:text-white",
                {
                  "!text-secondary dark:!text-secondary":
                    pathname == item.route,
                },
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SidebarDropdown;
