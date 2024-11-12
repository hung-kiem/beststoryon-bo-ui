"use client";

import React from "react";
import IconLightMode from "@/components/ui/icons/IconLightMode";
import IconDarkMode from "@/components/ui/icons/IconDarkMode";
import useColorMode from "@hooks/useColorMode";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/ui/Input/Input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

interface FormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [colorMode, setColorMode] = useColorMode();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/;

  const onSubmit = (data: FormValues) => {
    console.log(data);
    window.location.href = "/dashboard";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-screen items-center justify-center"
    >
      <div className="relative z-1 mx-auto w-full max-w-sm rounded bg-white p-8 shadow-lg dark:bg-graydark">
        <div
          className="absolute right-4 top-4"
          role="button"
          onClick={() => {
            setColorMode(colorMode === "dark" ? "light" : "dark");
          }}
        >
          <span className="dark:hidden">
            <IconLightMode />
          </span>
          <span className="hidden dark:block">
            <IconDarkMode />
          </span>
        </div>
        <div className="text-center mb-8">
          <span className="inline-block text-2xl font-bold uppercase text-primary dark:text-whiter">
            {process.env.NEXT_PUBLIC_APP_LOGIN_TITLE}
          </span>
        </div>

        <Controller
          name="username"
          control={control}
          rules={{ required: "Vui lòng nhập tên đăng nhập" }}
          render={({ field }) => (
            <div className="mb-6">
              <Input
                label="Username"
                placeholder="Nhập tên đăng nhập"
                {...field}
              />
            </div>
          )}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Vui lòng nhập mật khẩu",
            pattern: {
              value: passwordPattern,
              message:
                "Mật khẩu cần ít nhất 12 ký tự, bao gồm 1 chữ số và 1 ký tự đặc biệt",
            },
          }}
          render={({ field }) => (
            <div className="mb-6">
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Input
                  label=""
                  placeholder="Nhập mật khẩu"
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
                <button
                  type="button"
                  className="absolute right-3 flex items-center justify-center text-gray-500 dark:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}

        <div className="mb-4 text-right">
          <a
            href="/forgot-password"
            className="text-sm text-primary dark:text-primary-light hover:underline"
          >
            Quên mật khẩu?
          </a>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary p-3 text-white hover:bg-opacity-80 dark:bg-primary dark:hover:bg-opacity-80"
        >
          Đăng nhập
        </button>
      </div>
    </form>
  );
}
