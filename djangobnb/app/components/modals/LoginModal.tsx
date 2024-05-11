"use client";

import React from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { close } from "@/redux/features/modal/loginSlice";

const content = (
  <>
    <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please log in</h2>
    <form className="space-y-4">
      <input
        type="email"
        name=""
        id=""
        placeholder="Your e-mail address"
        className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
      />
      <input
        type="password"
        name=""
        id=""
        placeholder="Your password"
        className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
      />
      <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
        The error message
      </div>
      <CustomButton
        label="Submit"
        onClick={() => {
          console.log("submitted login");
        }}
      />
    </form>
  </>
);

const LoginModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.loginModal.isOpen);
  return (
    <Modal
      close={() => dispatch(close())}
      isOpen={isOpen}
      label="Log in"
      content={content}
    />
  );
};

export default LoginModal;
