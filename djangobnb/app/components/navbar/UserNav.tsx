"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import MenuLink from "./MenuLink";
import { useDispatch } from "react-redux";
import { open as openSignUp } from "@/redux/features/modal/signupSlice";
import { open as openLogin } from "@/redux/features/modal/loginSlice";

const UserNav = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-2 relative border rounded-full inline-block">
      <button
        className="flex items-center"
        onClick={() => setIsOpen((perv) => !perv)}
      >
        <Bars3Icon className="w-6 h-6" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="w-[220px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer overflow-hidden">
          <MenuLink
            onClick={() => {
              dispatch(openLogin());
              setIsOpen(false);
            }}
            label="Log in"
          />
          <MenuLink
            onClick={() => {
              dispatch(openSignUp());
              setIsOpen(false);
            }}
            label="Sign up"
          />
        </div>
      )}
    </div>
  );
};

export default UserNav;
