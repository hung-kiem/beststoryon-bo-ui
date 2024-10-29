import IconUIElements from "@/components/ui/icons/IconUIElements";
import IconChart from "@/components/ui/icons/IconChart";
import IconTable from "@/components/ui/icons/IconTable";
import IconCalendar from "@/components/ui/icons/IconCalendar";
import IconComponent from "@/components/ui/icons/IconComponent";
import IconUser from "@/components/ui/icons/IconUser";
import IconDashboard from "@/components/ui/icons/IconDashboard";
import { ReactNode } from "react";

interface MenuItems {
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
    name: "PAGES",
    modes: ["production", "development"],
    menuItems: [
      {
        icon: <IconComponent />,
        label: "Category",
        route: "/category",
      },
      {
        icon: <IconComponent />,
        label: "Tag",
        route: "/tag",
      },
      {
        icon: <IconComponent />,
        label: "Story",
        route: "/story",
      },
      {
        icon: <IconComponent />,
        label: "Chapter",
        route: "/chapter",
      },
      {
        icon: <IconDashboard />,
        label: "Dashboard",
        route: "/dashboard",
      },
    ],
  },
];
