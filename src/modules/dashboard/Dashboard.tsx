"use client";
import Breadcrumb from "@/components/ui/Breadcrumbs/Breadcrumb";
import Button from "@/components/ui/Buttons/Button";

const Dashboard = () => {
  return (
    <>
      <Breadcrumb pageName="Bảng demo" />
      <div className="mb-4 flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black">
        <div className="flex gap-2">
          <Button type="primary" size="medium" href="#">
            Tìm kiếm
          </Button>
          <Button type="outline" size="medium" href="#">
            Xuất excel
          </Button>
          <Button type="primary" size="medium" href="#">
            Thêm mới
          </Button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
