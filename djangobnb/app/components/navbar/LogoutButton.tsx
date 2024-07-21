"use client";
import React from "react";
import MenuLink from "./MenuLink";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { resetCookies } from "@/app/libs/actions/handelJWT";
import { revalidatePath } from "next/cache";

const LogoutButton = ({ onClick }: { onClick: () => void }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <MenuLink
      onClick={async () => {
        await resetCookies();

        router.push("/");
        dispatch(logout());
        onClick();
      }}
      label="Logout"
    />
  );
};

export default LogoutButton;
