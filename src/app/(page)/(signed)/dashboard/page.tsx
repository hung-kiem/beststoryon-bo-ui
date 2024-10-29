import Dashboard from "@/modules/dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return <Dashboard />;
}
