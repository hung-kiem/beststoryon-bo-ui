import IconBook from "@/components/ui/icons/IconBook";
import IconCategory from "@/components/ui/icons/IconCategory";
import React, { ReactNode } from "react";

export interface MenuItems {
  icon?: ReactNode;
  label: string;
  route?: string;
  scope?: string;
  children?: MenuItems[];
}
export const menuGroups: Array<{
  name?: string;
  modes?: Array<"development" | "production">;
  menuItems: Array<MenuItems>;
}> = [
  {
    name: "MENU",
    modes: ["production", "development"],
    menuItems: [
      {
        icon: <IconBook />,
        label: "Story",
        route: "/story",
      },
      {
        icon: <IconCategory />,
        label: "Category",
        route: "/category",
      },
      {
        icon: <IconCategory />,
        label: "Banner",
        route: "/banner",
      },
      {
        icon: <IconCategory />,
        label: "User",
        route: "/user",
      },
    ],
  },
];
