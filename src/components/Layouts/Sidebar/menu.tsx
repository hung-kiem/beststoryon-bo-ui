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
  children?: Array<Omit<MenuItems, "children">>;
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
        icon: <IconDashboard />,
        label: "Dashboard",
        route: "/dashboard",
      },
      {
        icon: <IconUser />,
        label: "Quản lý người dùng",
        children: [
          {
            label: "Danh sách người dùng",
            route: "/users",
          },
          { label: "Lịch sử người dùng", route: "/users/history" },
        ],
      },
    ],
  },
  {
    name: "COMPONENTS",
    modes: ["development"],
    menuItems: [
      {
        icon: <IconComponent />,
        label: "Components",
        route: "/components",
      },
      {
        icon: <IconCalendar />,
        label: "Calendar",
        route: "/calendar",
      },
      {
        icon: <IconTable />,
        label: "Tables",
        route: "/tables",
      },
      {
        icon: <IconChart />,
        label: "Chart",
        route: "/chart",
      },
      {
        icon: <IconUIElements />,
        label: "UI Elements",
        route: "#",
        children: [
          { label: "Alerts", route: "/ui/alerts" },
          { label: "Buttons", route: "/ui/buttons" },
        ],
      },
    ],
  },
];
