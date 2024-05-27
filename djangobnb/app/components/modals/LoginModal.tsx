"use client";

import React, { FormEvent, useState } from "react";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { close } from "@/redux/features/modal/loginSlice";
import { useRouter } from "next/navigation";
import { serverLogin } from "@/app/libs/actions/actions";
import { finishFirstLoad, setAuth } from "@/redux/features/auth/authSlice";
import { open } from "@/redux/features/modal/signupSlice";

const LoginModal = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    dispatch(close());
    dispatch(setAuth());
    dispatch(finishFirstLoad());
    router.push("/");
  };
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.loginModal.isOpen);

  const Content = (
    <>
      <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please log in</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const formData = new FormData(e.currentTarget);
          const res = await serverLogin(formData);
          if (res?.resOK) {
            onSubmit(e);
          } else {
            setError(res?.message);
          }
          setLoading(false);
        }}
        className="space-y-4"
      >
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
            <ul>
              {Object.entries(error).map(([key, value]) => {
                return (
                  <li key={key}>
                    {key} --&gt; {String(value)}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <CustomButton isLoading={loading} label="Login" />
        <div
          className="text-xs text-blue-500 cursor-pointer "
          onClick={() => {
            dispatch(close());
            dispatch(open());
          }}
        >
          i don't have account
        </div>
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
