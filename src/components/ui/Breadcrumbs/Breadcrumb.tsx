import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <nav className="mb-2">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link className="font-medium" href="/">
            BestStoryOn /
          </Link>
        </li>
        <li className="font-medium text-primary">{pageName}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
