"use client";

import React from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { close } from "@/redux/features/modal/signupSlice";

const content = (
  <>
    <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please Sign up</h2>
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
      <input
        type="password"
        name=""
        id=""
        placeholder="Repeat password"
        className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
      />
      <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
        The error message
      </div>
      <CustomButton
        label="Submit"
        onClick={() => {
          console.log("submitted sign up");
        }}
      />
    </form>
  </>
);

const SingUpModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.signup.isOpen);
  return (
    <Modal
      close={() => dispatch(close())}
      isOpen={isOpen}
      label="Sign up"
      content={content}
    />
  );
};
export default SingUpModal;
