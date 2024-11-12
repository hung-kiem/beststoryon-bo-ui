"use client";

import React from "react";
import Button from "@/components/ui/Buttons/Button";

export default function Page() {
  return (
    <div
      style={{
        fontFamily:
          'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        height: "calc(100vh - 80px - 32px)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h1
          className={
            "mr-[20px] inline-block border-r-[1px] border-solid border-r-[rgba(0,0,0,.3)] pr-[23px] font-semibold dark:border-r-[rgba(255,255,255,.3)]"
          }
          style={{
            fontSize: "24px",
            verticalAlign: "top",
            lineHeight: "49px",
          }}
        >
          404
        </h1>
        <div style={{ display: "inline-block" }}>
          <h2
            style={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "49px",
              margin: 0,
            }}
          >
            This page could not be found.
          </h2>
        </div>
        <Button
          type={"outline-black"}
          className={"w-1/2"}
          onClick={() => (window.location.pathname = "/")}
        >
          Trở về trang chủ
        </Button>
      </div>
    </div>
  );
}
