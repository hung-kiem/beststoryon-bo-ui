import clsx from "clsx";
import Link from "next/link";
import * as React from "react";

export interface BreadcrumbItemProps {
  pageName: string;
  path: string;
  isActive?: boolean;
}

const BreadcrumbItem = ({
  pageName,
  path,
  isActive = false,
}: BreadcrumbItemProps) => {
  return (
    <>
      <span> / </span>
      <li className={clsx("font-medium ", isActive && "text-primary")}>
        <Link href={path}>{pageName}</Link>
      </li>
    </>
  );
};

export default BreadcrumbItem;
