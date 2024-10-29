"use client";
import Loader from "@/components/commons/Loader";
import Breadcrumb from "@/components/ui/Breadcrumbs/Breadcrumb";
import Button from "@/components/ui/Buttons/Button";
import { Fragment, useEffect, useState } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState<Boolean>(false);

  const handleSearchClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <Breadcrumb pageName="Bảng demo" />
      <div className="mb-4 flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black">
        <div className="flex gap-2">
          <Button
            type="primary"
            size="medium"
            href="#"
            onClick={handleSearchClick}
          >
            Tìm kiếm
          </Button>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <Button type="outline" size="medium" href="#">
                Xuất excel
              </Button>
              <Button type="primary" size="medium" href="#">
                Thêm mới
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
