import Link from "next/link";
import React from "react";

export interface BreadcrumbItem {
  children?: React.ReactNode;
}

const Breadcrumb = ({ children }: BreadcrumbItem) => {
  return (
    <nav className="mb-2">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link className="font-medium" href={"/home"}>
            BestStoryOn
          </Link>
        </li>
        {children}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
