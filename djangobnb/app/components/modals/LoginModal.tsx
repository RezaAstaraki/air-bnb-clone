"use client";

import { useFormState } from "react-dom";
import React, { FormEvent, useEffect, useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { close } from "@/redux/features/modal/loginSlice";
import { useRouter } from "next/navigation";
import { serverLogin } from "@/app/libs/actions/actions";

const initialState = {
  message: "",
};
const LoginModal = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fromData = new FormData(event.currentTarget);
    serverLogin(fromData);
  };

  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.loginModal.isOpen);

  const Content = (
    <>
      <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please log in</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Your e-mail address"
          className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
        />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          className="w-full h-[54px] border border-gray-100 rounded-xl px-4 "
        />
        {error && (
          <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
            {error}
          </div>
        )}

        <CustomButton label="Submit" />
      </form>
    </>
  );

  return (
    <Modal
      close={() => dispatch(close())}
      isOpen={isOpen}
      label="Log in"
      content={Content}
    />
  );
};

export default LoginModal;
